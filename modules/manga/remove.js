const Command = require('../../core/command.js');
const { Op } = require("sequelize");
const {libraryModel} = require('../../databases/manga/seeders/manga_manager');


const remove = new Command();
remove.setName('remove');
remove.setDescription('Removes a manga from the library');
remove.setHasArgs(true);
remove.setUsage('command manga-name');
remove.setCooldown(5);


remove.execute = async function(message,args)
{
    const affectedRows = await libraryModel.destroy(
        {
            where:{
                [Op.and]:[
                    {
                        manga_id: args[0],
                        user_id: message.author.id,
                    }
                ]
               
            },
        }
    );

    if(affectedRows === 0)
        message.author.send("Something went wrong, manga not removed!");
    else
        message.author.send("Manga removed from library!");
}
module.exports = remove;