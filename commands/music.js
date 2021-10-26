const Command  = require('../core/command.js');

const music = new Command();

music.data.setName('music')
music.data.setDescription('Soon we will send you your music!');

music.execute = async (interaction) =>{
	await interaction.reply('We are working on it!');
};

module.exports = music;