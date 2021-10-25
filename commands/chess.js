const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chess')
		.setDescription('Replies with chess!'),
	async execute(interaction) {
		await interaction.reply('chess!');
	},
};
