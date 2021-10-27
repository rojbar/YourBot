const SubCommand = require('../../core/subcommand.js');
const { sourceModel } = require('../../databases/manga/seeders/manga_manager.js');


const list_sources = new SubCommand();
list_sources.data.setName('list-sources');
list_sources.data.setDescription('Shows the available sources for manga searches');

list_sources.execute = async interaction =>{
    
    const sources = await sourceModel.findAll();    

    const reply = new MessageEmbed().setTitle('Available Sources:');
    sources.forEach(element => {
        reply.addField(`${element.source_id}. ${element.name}`, `${element.url} \n ${element.language}`, false);
    }); 
    
    message.channel.send(reply);

}

module.exports = list_sources;
