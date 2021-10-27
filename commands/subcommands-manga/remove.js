const SubCommand = require('../../core/subcommand.js');
const { Op } = require("sequelize");
const {libraryModel} = require('../../databases/manga/seeders/manga_manager');


const remove = new SubCommand();
remove.data.setName('remove');
remove.data.setDescription('Removes a manga from the library');

remove.execute = async interaction =>{

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
