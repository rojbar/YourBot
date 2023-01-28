"use strict";
const Command = require('../core/command.js');
const help = new Command();
help.data.setName('help');
help.data.setDescription('Soon we will send you a link to our commands guide!');
help.execute = async (interaction) => {
    await interaction.reply('We are working on it!');
};
module.exports = help;
