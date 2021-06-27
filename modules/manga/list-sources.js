const { MessageEmbed } = require('discord.js');
const Command = require('../../core/command.js');
const { sourceModel } = require('../../databases/manga/seeders/manga_manager.js');


const list_sources = new Command();
list_sources.setName('list-sources');
list_sources.setDescription('Shows the available sources for manga searches');
list_sources.setHasArgs(false);
list_sources.setUsage('command');
list_sources.setCooldown(5);


list_sources.execute = async function(message,args)
{
    const sources = await sourceModel.findAll();    

    const reply = new MessageEmbed().setTitle('Available Sources:');
    sources.forEach(element => {
        reply.addField(`${element.source_id}. ${element.name}`, `${element.url} \n ${element.language}`, false);
    }); 
    
    message.channel.send(reply);
};
module.exports = list_sources;