const Command  = require('../core/command.js');

const manga = new Command();

manga.data.setName('manga')
manga.data.setDescription('It allows you to read manga!');

manga.loadSubcommands();

manga.sources = ["here we load all the manga sources in a collection where (name_source, source)"];

module.exports = manga;



