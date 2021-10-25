const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('music')
		.setDescription('music'),
	async execute(interaction) {
		await interaction.reply('music');
	},
};
