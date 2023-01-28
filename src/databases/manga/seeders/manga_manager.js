const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './databases/manga/database/manga_module.db',
    logging: console.log
});



const sourceModel = require('../models/source')(sequelize, Sequelize.DataTypes);
const mangaModel = require('../models/manga')(sequelize, Sequelize.DataTypes);
const enviromentModel = require('../models/enviroment')(sequelize, Sequelize.DataTypes);
const libraryModel = require('../models/library')(sequelize, Sequelize.DataTypes);

module.exports = {sequelize, sourceModel, mangaModel, enviromentModel,libraryModel};
