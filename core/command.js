const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

/**
 * A Command is an object with a data value that specifies its json structure, a subgroups() that is a collection of command collections under a key
 * a subcommands() collection that doesnt belong to any subgroup. An an execute method that recieves the interaction , an another function that defines
 * behaviour in case the command doesnt have subcommands
 */
class Command {

    constructor()
    {
        this.data = new SlashCommandBuilder();
        this.subGroups = new Discord.Collection();
        this.subCommands = new Discord.Collection();
    }

    async execute(interaction)
    {
       
        const subGroupName = interaction.options.getSubcommandGroup();
        const subCommandName = interaction.options.getSubcommand();

        const subCommand = false;

        if(subGroupName !== null)
            subCommand = this.subGroups().get(subGroupName).get(subCommandName);
        else
            subCommand = this.subCommands().get(subCommandName);


        if(!subCommand)
            return;
        
        try {

            await subCommand.execute(interaction);
    
        } catch (error) {
    
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this subcommand!', ephemeral: true });
        }    
    }
}

module.exports = Command;