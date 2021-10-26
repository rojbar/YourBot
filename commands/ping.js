const Command  = require('../core/command.js');

const ping = new Command();

ping.data.setName('ping')
ping.data.setDescription('Soon we will send you your ping in ms!');

ping.execute = async (interaction) =>{

	const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
	interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);

};

module.exports = ping;