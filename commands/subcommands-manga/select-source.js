const SubCommand = require('../../core/subcommand.js');
const { sourceModel,enviromentModel } = require('../../databases/manga/seeders/manga_manager.js');
const { MessageEmbed } = require('discord.js');


const select_source = new SubCommand();
select_source.data.setName('select-source');
select_source.data.setDescription('Selects a default source for searches');

select_source.execute = async interaction =>{

    const availableSources = await sourceModel.findAll();
    const exists = availableSources.some(element => {
        return element.source_id === parseInt(args[0]);
    });
    if(!exists) return message.channel.send('Invalid source!');

    const affectedRows = await enviromentModel.update(
        {
            default_source: args[0],
        },
        {
            where:{
                user_id: message.author.id
            }
        }
    );

    if(affectedRows[0] === 0)
        message.author.send("Something went wrong, default source not changed!");
    else
        message.author.send("Default source changed!");


}

module.exports = select_source;

