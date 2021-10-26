const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');


/**
 * This class represents a basic bot, it loads all its commands, events and logins it with a token
 * @property {string} prefix the prefix for the bot commands
 * @property {string} token the token of the bot for login
 * @property {Discord.Collection} commands a collection of all bot commands
 * @extends Discord.Client
 */
class Base_Bot extends Discord.Client {
    
	/**
	 * @constructs
     * @param {string} prefix the prefix for the bot commands
     * @param {string} token the token of the bot for login
	 * @param {Discord.Intents} intents the options passed to the bot, is Intents.FLAGS.GUILDS by default
     */
	constructor(prefix,token, intents = {intents: [Discord.Intents.FLAGS.GUILDS]}){
		super(intents);
		this.prefix = prefix;
		this.token = token;
		this.commands = new Discord.Collection(); 
	}

	/**
     *  1. It loads all the commands
     *  2. It loads all the events
     *  3. It logins with the token
     */
	start()
	{
		this.loadCommands();
		this.loadEvents();
		this.login(this.token);
	}

	/**
     *  loads commands into the commands.collection of the bot
     */
	loadCommands()
	{
		const dirpath = path.resolve('./commands');
		const commandFiles = fs.readdirSync(dirpath).filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const command = require(`${dirpath}/${file}`);
			this.commands.set(command.data.name, command);
		}

		console.log("Loaded commands!");

	}

	/**
	 * Loads all the events that the bot is able to handle
	 */
	loadEvents()
	{
		const dirpath = path.resolve('./events');
		const eventFiles = fs.readdirSync(dirpath).filter(file => file.endsWith('.js'));

		for (const file of eventFiles) {

			const event = require(`${dirpath}/${file}`);
			
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