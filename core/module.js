const Command = require('./Command.js');
const Discord = require('discord.js');
const Util = require('./util.js');
/**
 * The Module class represents a command that has subcommands 
 */
class Module extends Command{
    constructor()
    {
        super();
        this.commands = new Discord.Collection();
    }
    /**
     * Returns a collection with all the loaded commands @see Command
     * @return {Discord.Collection}
     */
    getCommands()
    {
        return this.commands;
    }
    /**
     * Sets the commands collections
     * @param {Discord.Collection} commands 
     */
    setCommands(commands)
    {
        this.commands = commands;
    }
    /**
     * Load all the commands associate it to the module name
     */
    loadCommands()
    {
       console.log(`Loading ${this.getName()} commands:`);
       this.commands = Util.loadCommands(`./modules/${this.getName()}`); 
    }
}
module.exports = Module;