const Command  = require('../core/command.js');

const ping = new Command();

ping.data.setName('ping')
ping.data.setDescription('Soon we will send you your ping in ms!');

ping.execute = async (interaction) =>{
	await interaction.reply('We are working on it!');
};

module.exports = ping;