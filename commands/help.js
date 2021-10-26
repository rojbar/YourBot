const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('we should add a website link that is send to the user!'),
	async execute(interaction) {
		await interaction.reply('help!');
	},
};
