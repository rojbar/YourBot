const SubCommand = require('../../core/subcommand.js');
const { Op } = require("sequelize");
const {libraryModel} = require('../../databases/manga/seeders/manga_manager');
const enviroment = require('./helpers/enviroment.js');

const remove = new SubCommand();
remove.data.setName('remove');
remove.data.setDescription('Removes a manga from the library');
remove.data.addIntegerOption(      
    option => 
        option.setName('manga_id')
          .setDescription('The number of the manga show in the library')
          .setRequired(true)

);

remove.execute = async interaction =>{

    await enviroment(interaction.user.id);

    const affectedRows = await libraryModel.destroy(
        {
            where:{
                [Op.and]:[
                    {
                        manga_id: interaction.options.getInteger('manga_id'),
                        user_id: interaction.user.id,
                    }
                ]
               
            },
        }
    );

    if(affectedRows === 0)
        interaction.reply("Something went wrong, manga not removed!");
    else
        interaction.reply("Manga removed from library!");


}

module.exports = remove;
