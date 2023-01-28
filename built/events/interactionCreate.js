"use strict";
const Event = require('../core/event.js');
const exec = async (interaction) => {
    if (!interaction.isCommand())
        return;
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command)
        return;
    try {
        await command.execute(interaction);
    }
    catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
};
module.exports = new Event('interactionCreate', false, exec);
