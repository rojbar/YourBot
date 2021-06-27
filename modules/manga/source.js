const Command = require('../../core/command.js');
const { sourceModel,enviromentModel } = require('../../databases/manga/seeders/manga_manager.js');
const { MessageEmbed } = require('discord.js');


const source = new Command();
source.setName('source');
source.setDescription('Shows the current source for mangas');
source.setHasArgs(false);	
source.setUsage('command');
source.setCooldown(5);


source.execute = async function(message,args)
{
    const enviroment = await enviromentModel.findByPk(message.author.id);
    const default_source = await sourceModel.findByPk(enviroment.default_source);

    const reply = new MessageEmbed().setTitle('Default Source:');
    reply.addField(`${default_source.source_id}. ${default_source.name}`, `${default_source.url} \n ${default_source.language}`, false);
    message.channel.send(reply);
}
module.exports = source;
