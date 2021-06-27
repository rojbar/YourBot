const Discord = require('discord.js');
const Util = require('./util.js')
const Module = require('./module.js');
const events = require('events');
/**
 * Base_Bot 
 * This class represents a basic bot, it allow to manage it (start, stop, restart and suspend), it also allows to 
 * dynamically load commands and modules, it extends Discord.Cliente class.
 * @property prefix
 * 
 */
class Base_Bot extends Discord.Client {
    /**
     * The bot requires two arguments, the prefix which is going to work with and the token for login
     * @param {string} prefix 
     * @param {string} token 
     * 
     */
    constructor(prefix,token){
        super();
        this.prefix = prefix;
        this.token = token;
        this.commands = new Discord.Collection(); 
        this.modules = new Discord.Collection();  
        this.cooldowns = new Discord.Collection();
        this.modulesBeingUsed = new Discord.Collection();
    }
    /**
     * This method starts the bot:
     *  1. It defines the behaviour for the event on 'message'
     *  2. It defines the behaviour for the event once 'ready'
     *  3. It logins with the token
     */
    async start()
    {
        this.once('ready',()=>{
            console.log('Server started!');
        });
        this.on('message', message => 
	        {
                if(!this.isValidBotMessage(message))return;

                const args = Util.getMessageArgs(message,this.prefix);
                const commandName = Util.getMessageCommandName(args);

                let command = 1;

                if(this.commands.has(commandName))
                {
                    console.log('Recieved Command:'+commandName+' with arguments: '+args);
                    command = this.commands.get(commandName);
                }
                else if(this.modules.has(commandName))
                {
                    console.log('Recieved Module:'+commandName+' with arguments: '+args);
                    command = this.modules.get(commandName);
                }
                else{
                    return;
                }
                
                if(command.args && !args.length)
                    return message.channel.send(Util.replyArgumentsNoPassed(message, command));
                

                //nos aseguramos de que el usuario no pueda volver a invocar otro modulo mientras este uno activo
                if(command instanceof Module)
                {
                    if(this.modulesBeingUsed.has(message.author.id))
                        return message.reply('You are already using a module!');
                    this.modulesBeingUsed.set(message.author.id);
                }
                //Para evitar spameo de comandos	
                if(!this.cooldowns.has(command.name))
                    this.cooldowns.set(command.name, new Discord.Collection());	

                const now = Date.now();
                const time = this.cooldowns.get(command.name);
                const cooldownCommand = command.getCooldown() *1000;

                if(time.has(message.author.id))
                {
                    const timeExp = time.get(message.author.id) + cooldownCommand;
                    if(now < timeExp)
                    {
                        const timeLeft = (timeExp - now)/1000;
                        return message.reply(`please wait ${timeLeft.toFixed(1)} before using the ${this.prefix}${command.getName()} command.`);
                    }
                }
                time.set(message.author.id, now);
                setTimeout(() => time.delete(message.author.id), cooldownCommand);
                try
                {
                    console.log('Command: '+command.name+' is being executed');
                    command.execute(message,args).then().catch(error => console.log(error));
                }catch(error)
                {
                    console.error(error);
                    message.reply('there was an error trying to execute the command');
                }
            }
        );
        this.login(this.token);
    }
    /**
     * This method stop the bot from running
     */
    quit()
    {
        this.destroy();
    }
    /**
     * This method reloads the modules and commands of the bot
     */
    restart()
    {

    }
    /**
     * This method stops the bot from recieving messages and stops all modules and commands being execute
     */
    suspend()
    {
        
    }
    /**
	 * Recieves a Discord Message and validates if it is a valid message, a Discord Message is valid when:
	 * 	1. It is made by a user
	 *  2. It comes from a server channel
	 * 	3. It starts with the prefix of the bot
	 * @param {Discord.Message} message 
	 * @return {boolean} True if the message is valid and false when the message is not valid
	 */
    isValidBotMessage(message)
	{
		return !message.author.bot && message.channel.type === "text" && message.content.startsWith(this.prefix)
    }
    /**
     *  loads commands and modules and assigns it to the .commands and .modules propiertys 
     */
    loadCommandsAndModules()
    {
        console.log('Loading comands:');
        this.commands = Util.loadCommands('./commands');
        console.log('Loading modules:');
        this.modules =  Util.loadCommands('./modules');
        this.modules.forEach(element => {
            element.on('finished',(user_id) => {
                this.modulesBeingUsed.delete(user_id);
            });
        });
    }
}
module.exports = Base_Bot;