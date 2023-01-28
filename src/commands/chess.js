const Command  = require('../core/command.js');

const chess = new Command();

chess.data.setName('chess');
chess.data.setDescription('A chess module that allows you to play with friends privately or in public!');

chess.execute = async (interaction) =>{
	await interaction.reply('We are working on it!');
};

module.exports = chess;
