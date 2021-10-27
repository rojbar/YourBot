const SubCommand = require('../../core/subcommand.js');
const { sourceModel,enviromentModel, libraryModel, mangaModel} = require('../../databases/manga/seeders/manga_manager.js');
const { MessageEmbed } = require('discord.js');


const search = new SubCommand();
search.data.setName('search');
search.data.setDescription('searches a manga with the default source');

search.execute = async interaction =>{

    const enviroment = await enviromentModel.findByPk(message.author.id);
    const default_source = await sourceModel.findByPk(enviroment.default_source);
   

    if(args.sources.has(default_source.name))
    {
        const sourceScraper = args.sources.get(default_source.name);

        const busquedaFormateada = sourceScraper.formatSearch(args);
        const resultados = await sourceScraper.search(sourceScraper.getSearchUrl().concat(busquedaFormateada));

        const reply = new MessageEmbed().setTitle('Search Results:');
        resultados.forEach( function(element, index){
            reply.addField(`${index+1}. ${element.name} | Status: ${element.state}`, `${element.author} \n ${element.last_chapter}`, false);
        }); 
        message.channel.send(reply);

        message.channel.awaitMessages( m => !m.author.bot,{max: 1}).then(
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
                            user_id: message.author.id,
                            last_chapter_read: 0,
                        }).then( message.channel.send("Manga added to the library!"));
                }
                else{
                    message.channel.send('Operation canceled');
                }
            }
        ).catch(error => console.log(error));
    }

}

module.exports = search;

