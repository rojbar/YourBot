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

//WE CREATE THEIR ASSOCIATIONS

//MANGA BELONGS TO A SOURCE, AND A SOURCE HAS MULTIPLE MANGAS
mangaModel.belongsTo(sourceModel, { foreignKey: 'source_id'});
sourceModel.hasMany(mangaModel,{ foreignKey: 'source_id'});
//ENVIROMENT HAS ONE DEFAULT_SOURCE AND A SOURCE CAN BE IN MULTIPL ENVIROMENTS
enviromentModel.belongsTo(sourceModel,{foreignKey: 'default_source'});
sourceModel.hasMany(enviromentModel,{foreignKey: 'default_source'});
//EACH ENVIROMENT HAS MULTIPLE MANGAS AND EACH MANGA CAN BE IN MULTIPLE ENVIROMENTS
enviromentModel.belongsToMany(mangaModel,{through: libraryModel, foreignKey: 'user_id',otherKey: 'manga_id' });
mangaModel.belongsToMany(enviromentModel,{through: libraryModel, foreignKey: 'manga_id',otherKey: 'user_id' });


 sequelize.sync({ force: true }).then( async () =>{
    await sourceModel.create({
        name: 'TuMangaOnline',
        language: 'Spanish',
        url:'https://lectortmo.com/',
      }, { fields: ['name','language','url'] });
    /**
    await sourceModel.create({
        name: 'MangaFox',
        language:'English',
        url: 'http://fanfox.net/',
    },{fields: ['name','language','url']});
    await enviromentModel.create(
      {
        user_id: 'b',
        default_source: 2,
      },
      {
        fields: ['user_id','default_source']
      }
    );
    await enviromentModel.create(
      {
        user_id: 'a',
        default_source: 2,
      },
      {
        fields: ['user_id','default_source']
      }
    );
    await mangaModel.create({
      name:'grand blue',
      source_id: 1,
    },{fields: ['name','source_id']}
    );
    await mangaModel.create({
      name:'20th century boys',
      source_id: 1,
    },{fields: ['name','source_id']}
    );
    await mangaModel.create({
      name:'naruto',
      source_id: 2,
    },{fields: ['name','source_id']}
    );
    await mangaModel.create({
      name:'uzaki-chan wa asobitai! ',
      source_id: 2,
    },{fields: ['name','source_id']}
    );
     
    await libraryModel.create(
      {
        manga_id: 1,
        user_id: 'b',
        last_chapter_read: 0,
      }, 
      {
        fields: ['manga_id','user_id','last_chapter_read']
      }
    );
    await libraryModel.create(
      {
        manga_id: 2,
        user_id: 'a',
        last_chapter_read: 0,
      }, 
      {
        fields: ['manga_id','user_id','last_chapter_read']
      }
    );
    await libraryModel.create(
      {
        manga_id: 3,
        user_id: 'b',
        last_chapter_read: 0,
      }, 
      {
        fields: ['manga_id','user_id','last_chapter_read']
      }
    );
    await libraryModel.create(
      {
        manga_id: 4,
        user_id: 'a',
        last_chapter_read: 0,
      }, 
      {
        fields: ['manga_id','user_id','last_chapter_read']
      }
    );
    await libraryModel.create(
      {
        manga_id: 1,
        user_id: 'a',
        last_chapter_read: 0,
      }, 
      {
        fields: ['manga_id','user_id','last_chapter_read']
      }
    );
    await libraryModel.create(
      {
        manga_id: 3,
        user_id: 'b',
        last_chapter_read: 0,
      }, 
      {
        fields: ['manga_id','user_id','last_chapter_read']
      }
    );     
    */
  sequelize.close();
 }).catch(console.error);
