const SubCommand = require('../../core/subcommand.js');
const {sourceModel, libraryModel, mangaModel} = require('../../databases/manga/seeders/manga_manager');
const fs = require('fs');


const read = new SubCommand();
read.data.setName('read');
read.data.setDescription('Starts reading a manga that is in your library');

read.execute = async interaction =>{
    
    const manga_selected = await libraryModel.findOne(
        { where: 
         {manga_id: args[0],
         user_id: message.author.id}
         }    
     ).catch(error => console.log(error));
 
     if(manga_selected == null)
         return message.channel.send("Manga not found!");  
 
     const manga_info = await mangaModel.findByPk(manga_selected.manga_id);
     const manga_source = await sourceModel.findByPk(manga_info.source_id);
         
     const sourceScraper = args.sources.get(manga_source.name);
     let availableChapters = await sourceScraper.searchChapters(manga_info.chapter_url);
     let chapterToRead = 0;
 
     if(args[1])
     {
         let chapterSelected = parseInt(args[1]);
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
         return message.channel.send("Chapter not found!");
         
     let htmlAnswer = await sourceScraper.generateChapterHTML(availableChapters[cap]);
     fs.writeFile( `./${message.author.id}.html`, htmlAnswer, (error) => {console.log(error); });
 
     chapterToRead += 1;
     let reply = new Discord.MessageEmbed().setTitle('Manga Chapter:').attachFiles([`${message.author.id}.html`]);   
     await libraryModel.update({last_chapter_read: chapterToRead },{
         where: {
             manga_id: args[0],
             user_id: message.author.id,
         }
     }).then().catch(error => console.log(error));
     message.channel.send(reply);

}

module.exports = read;




