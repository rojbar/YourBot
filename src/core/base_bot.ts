import Discord from 'discord.js';
import fs from 'fs';
import path from 'path';
import Command from './command';
import Event from './event';


/**
 * This class represents a basic bot, it loads all its commands, events and logins it with a token
 * @property {string} prefix the prefix for the bot commands
 * @property {Discord.Collection} commands a collection of all bot commands
 * @extends Discord.Client
 */
class BaseBot extends Discord.Client {
    
	commands: Discord.Collection<string, Command>;

	/**
	 * @constructs

	 * @param intents the options passed to the bot, is Intents.FLAGS.GUILDS by default
     */
	constructor(intents = {intents: [Discord.Intents.FLAGS.GUILDS]}){
		super(intents);
		this.commands = new Discord.Collection(); 
	}

	/**
     *  1. It loads all the commands
     *  2. It loads all the events
     *  3. It logins with the token
     */
	start() : void {
		this.loadCommands();
		this.loadEvents();
		this.login(process.env.DISCORD_TOKEN);
	}

	/**
     *  loads commands into the commands.collection of the bot
     */
	loadCommands() : void {
		const dirpath = path.resolve('./commands');
		const commandFiles = fs.readdirSync(dirpath).filter(file => file.endsWith('.js'));

		commandFiles.forEach(file => {
			const command = require(`${dirpath}/${file}`) as Command;
			this.commands.set(command.data.name, command);
		});

		console.log("Loaded commands!");
	}

	/**
	 * Loads all the events that the bot is able to handle
	 */
	loadEvents() : void {
		const dirpath = path.resolve('./events');
		const eventFiles = fs.readdirSync(dirpath).filter(file => file.endsWith('.js'));

		eventFiles.forEach(file => {
			const event = require(`${dirpath}/${file}`) as Event;

			if (event.once) {
				this.once(event.name, (...args) => event.exec(...args));
			} else {
				this.on(event.name,  (...args) =>  event.exec(...args));
			}
		});

		console.log("Loaded events!");
	}
}

export default BaseBot;