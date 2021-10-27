const Command  = require('../core/command.js');

const manga = new Command();

manga.data.setName('manga')
manga.data.setDescription('Soon we will send you your ping in ms!');

manga.loadSubcommands();

module.exports = manga;



