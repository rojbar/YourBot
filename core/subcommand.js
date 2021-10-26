const { SlashCommandSubcommandBuilder } = require('@discordjs/builders');

/**
 * Just an structure for manipulating subcommands, check if retain this code.
 * All subcommand must implement the SlashCommandSubcommandBuilder for building their metadata
 * @property {SlashCommandSubcommandBuilder} data the metadata info of the subcommand
 */
class SubCommand {

    /**
     * @constructs
     */
    constructor()
    {
        this.data = new SlashCommandSubcommandBuilder();
    }

    /**
     * What the subcommand is going to answer to the user
     * @param {Discord.Interaction} interaction user interaction to respond
     */
    async execute(interaction)
    {
       
    }
}

module.exports = SubCommand;