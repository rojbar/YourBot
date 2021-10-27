const Command  = require('../core/command.js');

const manga = new Command();

manga.data.setName('manga')
manga.data.setDescription('It allows you to read manga!');

manga.loadSubcommands();


module.exports = manga;



