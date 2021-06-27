const Command = require('../../core/command.js');
const { MessageEmbed } = require('discord.js');
const {sequelize} = require('../../databases/manga/seeders/manga_manager');


const library = new Command();
library.setName('library');
library.setDescription('Show the mangas you have in your library');
library.setHasArgs(false);
library.setUsage('command');
library.setCooldown(5);


library.execute = async function(message,args){

    const [results, metadata] = await sequelize.query(
       `SELECT library.manga_id AS id, manga.name AS name,last_chapter_read AS latest, source.name AS source_name,source.language AS language
        FROM library
        INNER JOIN manga ON manga.manga_id = library.manga_id
        INNER JOIN source ON manga.source_id = source.source_id
        WHERE user_id = '${message.author.id}';`
    );

    const reply = new MessageEmbed().setTitle('Your Library:');

    results.forEach(element => {
        reply.addField(`${element.id}. ${element.name}`, `${element.source_name} \n ${element.language} \n Last chapter read: ${element.latest}`, false);
    }); 

    if(results.length === 0)
        reply.addField('Empty','Empty',false);
    
    message.channel.send(reply);
 
};
module.exports = library;