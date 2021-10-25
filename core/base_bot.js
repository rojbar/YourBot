const Discord = require('discord.js');
const fs = require('fs');

/**
 * This class represents a basic bot, it allows to manage it (start, stop, restart and suspend), it also allows to 
 * dynamically load commands and modules, it extends Discord.Client class.
 * @property {string} prefix the prefix for the bot commands
 * @property {string} token the token of the bot for login
 * @property {Discord.Collection} commands a collection of all bot commands
 * @property {Discord.Collection} modules a collection of all bot modules
 * @property {Discord.Collection} cooldowns a collection of all cooldowns
 * @property {Discord.Collection} modulesBeingUsed a collection of modules being used
 */
class Base_Bot extends Discord.Client {
    
	/**
     * The bot requires two arguments and has a third argument by default.
	 * @constructs
     * @param {string} prefix the prefix for the bot commands
     * @param {string} token the token of the bot for login
	 * @param {Discord.Intents} intents the options passed to the bot
     */
	constructor(prefix,token, intents = {intents: [Discord.Intents.FLAGS.GUILDS]}){
		super(intents);
		this.prefix = prefix;
		this.token = token;
		this.commands = new Discord.Collection(); 
	}

	/**
     * This method starts the bot:
     *  1. It defines the behaviour for the event on 'message'
     *  2. It defines the behaviour for the event once 'ready'
     *  3. It logins with the token
     */
	start()
	{
		this.loadCommands();
		this.loadEvents();
		this.login(this.token);
	}

	/**
     *  loads commands into the commands client collection
     */
	loadCommands()
	{
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const command = require(`.././commands/${file}`);
			this.commands.set(command.data.name, command);
		}
		console.log("Loaded commands!");

	}

	/**
	 * Loads all the events that the bot is able to handle
	 */
	loadEvents()
	{
		const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

		for (const file of eventFiles) {

			const event = require(`.././events/${file}`);
			
			if (event.once)
			{
				this.once(event.name, (...args) => event.exec(...args));
			}	
			else
			{
				this.on(event.name,  (...args) =>  event.exec(...args));
			}	
		}

		console.log("Loaded events!");

	}
}

module.exports = Base_Bot;