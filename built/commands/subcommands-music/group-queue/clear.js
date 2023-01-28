"use strict";
const SubCommand = require('../../../core/subcommand.js');
const clear = new SubCommand();
clear.data.setName('clear');
clear.data.setDescription('Clears all songs in the queue');
clear.execute = async (interaction) => {
    interaction.reply('You call clear all songs from queue from music');
};
module.exports = clear;
