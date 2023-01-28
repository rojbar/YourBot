import Discord from 'discord.js';
import { SlashCommandBuilder } from "@discordjs/builders";
import SubCommand from './subcommand';

interface Command {
    data: SlashCommandBuilder;
    subGroups: Discord.Collection<string, Discord.Collection<string,SubCommand>>;
    subCommands: Discord.Collection<string, SubCommand>;

    execute( interaction : Discord.Interaction) : Promise<void>;
    loadSubGroups() : void;
    loadSubcommands() : void;
}   

export default Command;