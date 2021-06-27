const Discord = require('discord.js');
const fs = require('fs');
/**
 * Util has useful methods, it requires the prefix variable for the bot
 */
class Util{
	constructor(){
		
	}
	/**
	 * loadCommands takes a path and loads every singles javascript file returning a Collection compose of:
	 * {command.name -> command} where command is the command loaded see  also @Command or @Module
	 * @param {string} path 
	 * @returns {DiscordCollection} 
	 */
	static loadCommands(pathTo)
	{
		const commandsFiles = fs.readdirSync(pathTo).filter(file => file.endsWith('.js'));
		const returnCollection = new Discord.Collection();
		for(const file of commandsFiles)
		{
			const command = require(`.${pathTo.concat(`/${file}`)}`);
			returnCollection.set(command.getName(), command);
			console.log(command.getName()+' loaded');
		}
		return returnCollection;
	}
	/**
	 * Returns the arguments of a message, the arguments of a message are separated by space that way they are recognized
	 * @param {DiscordMessage} message 
	 * @return {string[]} 
	 */
	static getMessageArgs(message,prefix)
	{
		return message.content.slice(prefix.length).split(/ +/);
	}
	/**
	 * Removes and returns the first argument of an array of strings, for the bot the first argument of a command is the command name.
	 * @param {string[]} args 
	 * @return {string}  
	 */
	static getMessageCommandName(args)
	{
		return args.shift().toLowerCase();
	}
	/**
	 * 
	 * @param {DiscordMessage} message 
	 * @param {Command} command 
	 * @return {string} the require arguments message
	 */
	static replyArgumentsNoPassed(message,command)
	{
		let reply = `We need arguments! ${message.author} remember you should type  ${command.getUsage()} `;
		return reply;
	}
}
module.exports = Util;