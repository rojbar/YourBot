const Discord = require('discord.js');
const { SlashCommandBuilder, SlashCommandSubcommandGroupBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');


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
        
        const subGroupName = interaction.options.getSubcommandGroup(false);
        const subCommandName = interaction.options.getSubcommand(false);

        let subCommand = false;

        if(subGroupName !== null)
            subCommand = this.subGroups.get(subGroupName).get(subCommandName);
        else
            subCommand = this.subCommands.get(subCommandName);


        if(!subCommand)
            return;
        
        try {

            await subCommand.execute(interaction);
    
        } catch (error) {
    
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this subcommand!', ephemeral: true });
        }    
    }

    loadSubGroups()
    {
        const dirpath = path.join(__dirname,`../commands/subcommands-${this.data.name}`);
        const subcommandGroups = fs.readdirSync(dirpath).filter(file => file.endsWith('.json'));

        for (const file of subcommandGroups) {

            const subGroupFile = fs.readFileSync(`${dirpath}/${file}`);
            const subGroup = JSON.parse(subGroupFile);
            
            const subGroupBuilder = new SlashCommandSubcommandGroupBuilder();
            subGroupBuilder.setName(subGroup.name);
            subGroupBuilder.setDescription(subGroup.description);
  
            this.subGroups.set(subGroup.name, new Discord.Collection());

            const subcommandFiles = fs.readdirSync(`${dirpath}/group-${subGroup.name}`).filter(file => file.endsWith('.js'));
            for (const fileSub of subcommandFiles )
            {
                const command = require(`${dirpath}/group-${subGroup.name}/${fileSub}`);
                this.subGroups.get(subGroup.name).set(command.data.name, command);
                subGroupBuilder.addSubcommand(command.data);
                
            }
            
            this.data.addSubcommandGroup(subGroupBuilder);
        }
        console.log(`Loaded subgroups on the ${this.data.name} command`);

    }

    loadSubcommands()
    {
        const dirpath = path.join(__dirname,`../commands/subcommands-${this.data.name}`);
        const subcommandFiles = fs.readdirSync(dirpath).filter(file => file.endsWith('.js'));

        for (const file of subcommandFiles) {
            const command = require(`${dirpath}/${file}`);
            this.subCommands.set(command.data.name, command);
            this.data.addSubcommand(command.data);
        }
	    console.log(`Loaded subcommands on the ${this.data.name} command`);
    }
}

module.exports = Command;