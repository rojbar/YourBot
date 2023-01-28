import { SlashCommandSubcommandBuilder } from '@discordjs/builders';
import { Interaction } from 'discord.js';


/**
 * Just an structure for manipulating subcommands, check if retain this code.
 * All subcommand must implement the SlashCommandSubcommandBuilder for building their metadata
 * @property data the metadata info of the subcommand
 */
class SubCommand {

    data: SlashCommandSubcommandBuilder;

    /**
     * @constructs
     */
    constructor(){
        this.data = new SlashCommandSubcommandBuilder();
    }

    /**
     * What the subcommand is going to answer to the user
     * @param interaction user interaction to respond
     */
    async execute(interaction : Interaction){
    }
}

export default SubCommand;