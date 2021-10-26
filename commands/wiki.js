const Command  = require('../core/command.js');

const help = new Command();

help.data.setName('wiki')
help.data.setDescription('Search anything on wikipedia.com');

help.execute = async (interaction) =>{
	await interaction.reply('We are working on it!');
};

module.exports = help;