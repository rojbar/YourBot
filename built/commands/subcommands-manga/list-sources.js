"use strict";
const SubCommand = require('../../core/subcommand.js');
const { sourceModel } = require('../../databases/manga/seeders/manga_manager.js');
const enviroment = require('./helpers/enviroment.js');
const { MessageEmbed } = require('discord.js');
const list_sources = new SubCommand();
list_sources.data.setName('list-sources');
list_sources.data.setDescription('Shows the available sources for manga searches');
list_sources.execute = async (interaction) => {
    await enviroment(interaction.user.id);
    const sources = await sourceModel.findAll();
    const reply = new MessageEmbed().setTitle('Available Sources:');
    sources.forEach(element => {
        reply.addField(`${element.source_id}. ${element.name}`, `${element.url} \n ${element.language}`, false);
    });
    interaction.reply({ embeds: [reply] });
};
module.exports = list_sources;
