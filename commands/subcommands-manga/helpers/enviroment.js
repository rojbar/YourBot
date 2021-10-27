const manga_manager = require('../../../databases/manga/seeders/manga_manager');

const enviroment =  async (authorId) => {
    
    return  await manga_manager.enviromentModel.findOrCreate({
        where: {
            user_id: authorId,
        },
        defaults: {
            user_id: authorId,
            default_source: 1,
            }
    });
}

module.exports = enviroment;