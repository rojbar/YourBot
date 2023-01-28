"use strict";
const SubCommand = require('../../core/subcommand.js');
const { sourceModel, enviromentModel } = require('../../databases/manga/seeders/manga_manager.js');
const enviroment = require('./helpers/enviroment.js');
const select_source = new SubCommand();
select_source.data.setName('select-source');
select_source.data.setDescription('Selects a default source for searches');
select_source.data.addIntegerOption(option => option.setName('source_id')
    .setDescription('The number of the source show in the list-sources')
    .setRequired(true));
select_source.execute = async (interaction) => {
    await enviroment(interaction.user.id);
    const availableSources = await sourceModel.findAll();
    const exists = availableSources.some(element => {
        return element.source_id === interaction.options.getInteger('source_id');
    });
    if (!exists)
        return interaction.reply('Invalid source!');
    const affectedRows = await enviromentModel.update({
        default_source: interaction.options.getInteger('source_id'),
    }, {
        where: {
            user_id: interaction.user.id
        }
    });
    if (affectedRows[0] === 0)
        interaction.reply("Something went wrong, default source not changed!");
    else
        interaction.reply("Default source changed!");
};
module.exports = select_source;
