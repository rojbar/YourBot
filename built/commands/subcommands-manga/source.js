"use strict";
const SubCommand = require('../../core/subcommand.js');
const { sourceModel, enviromentModel } = require('../../databases/manga/seeders/manga_manager.js');
const { MessageEmbed } = require('discord.js');
const source = new SubCommand();
source.data.setName('source');
source.data.setDescription('Shows the current source for mangas');
source.execute = async (interaction) => {
    const enviroment = await enviromentModel.findByPk(interaction.user.id);
    const default_source = await sourceModel.findByPk(enviroment.default_source);
    const reply = new MessageEmbed().setTitle('Default Source:');
    reply.addField(`${default_source.source_id}. ${default_source.name}`, `${default_source.url} \n ${default_source.language}`, false);
    interaction.reply({ embeds: [reply] });
};
module.exports = source;
