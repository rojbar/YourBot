const Command  = require('../core/command.js');

const manga = new Command();

manga.data.setName('manga')
manga.data.setDescription('Soon we will send you your ping in ms!');

manga.execute = async (interaction) => {
		
	interaction.reply('Login!');

	interaction.user.createDM().then(
		DMChannel =>{
			
			DMChannel.send('Manga reader 1.0');
			const filter = m => m.content.includes('discord');
			DMChannel.send('bye');

		}
	);
};

module.exports = manga;



