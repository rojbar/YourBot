const EventEmitter = require('events');
/**
 * A command is a class that represents a command available for a user to execute.
 */
class Command extends EventEmitter{
    /**
     * A command is initialize by defualt with the next values:
     * name -> "" (name of the command)
     * descriptions -> "" (description of the command -what the command does)
     * hasArgs -> false (whether the command requires arguments)
     * usage -> "" (an example of using the command)
     * cooldown -> 5 (time before using again  the command by the same user)
     */
    constructor(){
        super();
        this.name = "";
        this.description = "";
        this.hasArgs = false;
        this.usage = "";
        this.cooldown = 5;
    }
    /**
     * Returns the name of the command
     * @return {string}
     */
    getName(){
        return this.name;
    }
    /**
     * Returns the description of the command
     * @return {string}
     */
    getDescription()
    {
        return this.description;
    }
    /**
     * Returns if the command requires arguments
     * @return {boolean}
     */
    getHasArgs()
    {
        return this.hasArgs;
    }
    /**
     * Returns the description of how to use the command
     * @return {string}
     */
    getUsage()
    {
        return this.usage;
    }
    /**
     * Returns the time in seconds between the usage of the command by the same user
     * @return {integer}
     */
    getCooldown()
    {
        return this.cooldown;
    }
    /**
     * @param {string} name
     */
    setName(name){
        this.name = name;
    }
    /**
     * @param {string} description
     */
    setDescription(description)
    {
        this.description = description;
    }
    /**
     * @param {boolean} hasArgs
     */
    setHasArgs(hasArgs)
    {
        this.hasArgs = hasArgs;
    }
    /**
     * @param {string} usage
     */
    setUsage(usage)
    {
        this.usage = usage;
    }
    /**
     * @param {integer} cooldown
     */
    setCooldown(cooldown)
    {
        this.cooldown = cooldown;
    }
    /**
     * Functions that executes the command behaviour
     * @param {Discord.message} message 
     * @param {String[]} args 
     */
    async execute(message,args)
    {

    }
}
module.exports = Command;