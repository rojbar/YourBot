const SubCommand = require('../../core/subcommand.js');
const {sourceModel, libraryModel, mangaModel} = require('../../databases/manga/seeders/manga_manager');
const fs = require('fs');
const enviroment = require('./helpers/enviroment.js');
const {MessageEmbed} = require('discord.js');


const read = new SubCommand();
read.data.setName('read');
read.data.setDescription('Starts reading a manga that is in your library');
read.data.addStringOption(      
    option => 
        option.setName('manga_id')
          .setDescription('The id of the manga')
          .setRequired(true)
);
read.data.addIntegerOption(      
    option => 
        option.setName('chapter')
          .setDescription('The number of the chapter you want to read')
          .setRequired(false)
);

read.execute = async interaction =>{

    await enviroment(interaction.user.id);
    
    const manga_selected = await libraryModel.findOne({ 
            where: {
                manga_id: interaction.options.getString('manga_id'),
            
                user_id: interaction.user.id
            }
        }    
    ).catch(error => console.log(error));
 
    if(manga_selected == null)
        return interaction.reply("Manga not found!");  
 
    const manga_info = await mangaModel.findByPk(manga_selected.manga_id);
    const manga_source = await sourceModel.findByPk(manga_info.source_id);
         
    const sourceScraper = interaction.client.commands.get(interaction.commandName).sources.get(manga_source.name);
    
    let availableChapters = await sourceScraper.searchChapters(manga_info.chapter_url);
    let chapterToRead = 0;

    if(interaction.options.getInteger('chapter')){
        
        let chapterSelected = parseInt(interaction.options.getInteger('chapter'));
        if(chapterSelected > 0)
            chapterToRead = chapterSelected - 1;
        else
            chapterToRead = manga_selected.last_chapter_read;
    }
    else
        chapterToRead = manga_selected.last_chapter_read;


    let cap = ((availableChapters.length -1)-chapterToRead); 
    console.log("the chapter selected is: "+cap);   

    if (cap >= availableChapters.length || cap < 0)
        return interaction.reply("Chapter not found!");
        
    let htmlAnswer = await sourceScraper.generateChapterHTML(availableChapters[cap]);
    fs.writeFile( `./${interaction.user.id}.html`, htmlAnswer, (error) => {console.log(error); });

    chapterToRead += 1;
    let reply = new MessageEmbed().setTitle('Manga Chapter:').attachFiles([`${interaction.user.id}.html`]);   
    await libraryModel.update({last_chapter_read: chapterToRead },{
        where: {
            manga_id: interaction.options.getString('manga_id'),
            user_id: interaction.user.id,
        }
    }).then().catch(error => console.log(error));

    interaction.reply({embeds: [reply]});

}

module.exports = read;




