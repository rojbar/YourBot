const { SlashCommandSubcommandBuilder } = require('@discordjs/builders');

/**
 * Just an structure for manipulating subcommands, check if retain this code.
 */
class SubCommand {

    constructor()
    {
        this.data = new SlashCommandSubcommandBuilder();
    }

    async execute(interaction)
    {
       
    }
}

module.exports = SubCommand;