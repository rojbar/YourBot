const Command = require('../../core/command.js');
const {enviromentModel, sourceModel} = require('../../databases/manga/seeders/manga_manager');


const select_source = new Command();
select_source.setName('select-source');
select_source.setDescription('Selects a default source for searches');
select_source.setHasArgs(true);
select_source.setUsage('command source-name');
select_source.setCooldown(5);


select_source.execute = async function(message,args)
{

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
