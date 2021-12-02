const SubCommand = require('../../core/subcommand.js');
const { sourceModel,enviromentModel, libraryModel, mangaModel} = require('../../databases/manga/seeders/manga_manager.js');
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
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
    
    await interaction.deferReply();
    
    await env(interaction.user.id);

    const enviroment = await enviromentModel.findByPk(interaction.user.id);
    const default_source = await sourceModel.findByPk(enviroment.default_source);
   

    if(!interaction.client.commands.get(interaction.commandName).sources.has(default_source.name))
    { 
        interaction.reply('There was an error');
        return;
    }
    
    const sourceScraper = interaction.client.commands.get(interaction.commandName).sources.get(default_source.name);

    const input = sourceScraper.formatSearch(interaction.options.getString('name').split(" "));

    const resultados = await sourceScraper.search(sourceScraper.getSearchUrl().concat(input), interaction.client.browser);

    const reply = new MessageEmbed().setTitle('Search Results:').setDescription('Select a manga to add');

    const menuOptions = [];
    resultados.forEach( function(element, index){
        menuOptions.push({
            label: `${element.name.slice(0,99)}`,
            description: ` `,
            value: `${index}`
        });
    });

    console.log(menuOptions.length);
    console.log(menuOptions);

    const row = new MessageActionRow() 
			.addComponents(
                new MessageSelectMenu().setCustomId('selectManga')
                                       .setMinValues(1)
                                       .setMaxValues(1)
                                       .setPlaceholder('select the manga to read!')
                                       .addOptions(menuOptions)
			);

    await interaction.editReply({content:'Your results:',embeds: [reply], components:[row]});

    const filter = i => {
        i.deferUpdate();
        return i.user.id === interaction.user.id;
    };
    
    await interaction.channel.awaitMessageComponent({ filter, componentType: 'SELECT_MENU', time: 60000 })
        .then( async (selectMenuInteraction) =>{
                
                mangaSelected = resultados[selectMenuInteraction.values[0]];

                const mangaResult = await mangaModel.findOrCreate( 
                    {
                        where: {
                            name: mangaSelected.name,
                            source_id: default_source.source_id,
                            chapter_url: mangaSelected.chapterURL,
                        },
                        defaults:{
                            name: mangaSelected.name,
                            source_id: default_source.source_id ,
                            chapter_url: mangaSelected.chapterURL,
                            },
                        fields: ['name','source_id','chapter_url'],
                    }
                ).catch( (error) => {
                    console.error(error);
                });

                await libraryModel.create(
                {
                    manga_id: mangaResult[0].manga_id ,
                    user_id: selectMenuInteraction.user.id,
                    last_chapter_read: 0,
                }).then( async (resp) =>{

                    await selectMenuInteraction.followUp("Manga added to the library!");
                })
                .catch( async (error) => {
                    console.error(error);
                    await selectMenuInteraction.followUp("Something went wrong");
                });
            }
        )
        .catch( async (error) => {
                console.error(error);
                await interaction.followUp('Not manga selected');
             }
        );
    
    await interaction.deleteReply();
}

module.exports = search;

