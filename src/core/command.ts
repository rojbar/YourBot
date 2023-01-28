import Discord from 'discord.js';
import { SlashCommandBuilder, SlashCommandSubcommandGroupBuilder } from '@discordjs/builders'; 
import fs from 'fs';
import path from 'path';
import SubCommand from './subcommand';
import Group from './interfaces/group';


/**
 * A Command is an SlashCommand.
 * @property data the data of the command for register
 * @property subGroups all the subgroups of the command. Each soubgroup contains a collection of subcommands
 * @property subCommands all the subcommands that are not part of a subgroup
 */
class Command {

    data: SlashCommandBuilder;
    subGroups: Discord.Collection<string, Discord.Collection<string,SubCommand>>;
    subCommands: Discord.Collection<string, SubCommand>;
    
    /**
     * @constructs
     */
    constructor(){
        this.data = new SlashCommandBuilder();
        this.subGroups = new Discord.Collection();
        this.subCommands = new Discord.Collection();
    }

    /**
     * The execute method is configure by deault to execute a subcommand of a command, either by being a single subcommand or one from a subgroup
     * @param interaction the user interaction 
     */
    async execute(interaction : Discord.Interaction) : Promise<void> {
        
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
        }    
    }

    /**
     * Loads all the subgroups of a command, and each subcommand that is in a subgroup saving them in the subGroups collection.
     * It also loads all the metadat of the soubgroups and saves it in the data property of the command.
     */
    loadSubGroups(){
        const dirpath = path.join(__dirname,`../commands/subcommands-${this.data.name}`);
        const subcommandGroups = fs.readdirSync(dirpath).filter(file => file.endsWith('.json'));

        subcommandGroups.forEach(file => {
            const subGroupFile = fs.readFileSync(`${dirpath}/${file}`);
            const subGroup = JSON.parse(subGroupFile.toString()) as Group;
            
            const subGroupBuilder = new SlashCommandSubcommandGroupBuilder();
            subGroupBuilder.setName(subGroup.name);
            subGroupBuilder.setDescription(subGroup.description);
  
            this.subGroups.set(subGroup.name, new Discord.Collection());

            const subcommandFiles = fs.readdirSync(`${dirpath}/group-${subGroup.name}`).filter(file => file.endsWith('.js'));
            subcommandFiles.forEach(fileSub => {
                const command = require(`${dirpath}/group-${subGroup.name}/${fileSub}`) as SubCommand;
                this.subGroups.get(subGroup.name).set(command.data.name, command);
                subGroupBuilder.addSubcommand(command.data);
            });
        
            this.data.addSubcommandGroup(subGroupBuilder);    
        });

        console.log(`Loaded subgroups on the ${this.data.name} command`);
    }

    /**
     * Loads all the direct subcommands of a command (those who are not part of a subgroup).
     * It also loads all of the subcommands metadata and saves it in the data property of the command.
     */
    loadSubcommands(){
        const dirpath = path.join(__dirname,`../commands/subcommands-${this.data.name}`);
        const subcommandFiles = fs.readdirSync(dirpath).filter(file => file.endsWith('.js'));

        subcommandFiles.forEach(file => {
            const command = require(`${dirpath}/${file}`) as SubCommand;
            this.subCommands.set(command.data.name, command);
            this.data.addSubcommand(command.data);
        });

	    console.log(`Loaded subcommands on the ${this.data.name} command`);
    }
}

export default Command;