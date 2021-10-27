const SubCommand = require('../../core/subcommand.js');
const { sourceModel,enviromentModel, libraryModel, mangaModel} = require('../../databases/manga/seeders/manga_manager.js');
const { MessageEmbed } = require('discord.js');
const env = require('./helpers/enviroment.js');


const search = new SubCommand();
search.data.setName('search');
search.data.setDescription('searches a manga with the default source');
search.data.addStringOption(      
    option => 
        option.setName('name')
          .setDescription('The name of the manga')
          .setRequired(true)
);

search.execute = async interaction =>{

    await env(interaction.user.id);

    const enviroment = await enviromentModel.findByPk(interaction.user.id);
    const default_source = await sourceModel.findByPk(enviroment.default_source);
   

    if(interaction.client.commands.get(interaction.commandName).sources.has(default_source.name))
    {
        const sourceScraper = interaction.client.commands.get(interaction.commandName).sources.get(default_source.name);

        const resultados = await sourceScraper.search(sourceScraper.getSearchUrl().concat(interaction.options.getString('name')));

        const reply = new MessageEmbed().setTitle('Search Results:');
        resultados.forEach( function(element, index){
            reply.addField(`${index+1}. ${element.name} | Status: ${element.state}`, `${element.author} \n ${element.last_chapter}`, false);
        }); 
        interaction.reply(reply);

        interaction.channel.awaitMessages( m => !m.author.bot,{max: 1}).then(
           async resultado => 
            {
                let optionSelected =parseInt( resultado.first().content);
                if(optionSelected > 0)
                {
                    const mangaResult = await mangaModel.findOrCreate( 
                        {
                            where: {
                                name: resultados[optionSelected-1].name,
                                source_id: default_source.source_id,
                                chapter_url: resultados[optionSelected-1].chapterURL,
                            },
                            defaults:{
                                name: resultados[optionSelected-1].name,
                                source_id: default_source.source_id ,
                                chapter_url: resultados[optionSelected-1].chapterURL,
                                },
                            fields: ['name','source_id','chapter_url'],
                        }
                    );
                    await libraryModel.create(
                        {
                            manga_id: mangaResult[0].manga_id ,
                            user_id: interaction.user.id,
                            last_chapter_read: 0,
                        }).then( interaction.reply("Manga added to the library!"));
                }
                else{
                    interaction.reply('Operation canceled');
                }
            }
        ).catch(error => console.log(error));
    }

}

module.exports = search;

