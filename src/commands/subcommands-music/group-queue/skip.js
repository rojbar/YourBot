const SubCommand = require('../../../core/subcommand.js');

const skip = new SubCommand();
skip.data.setName('skip');
skip.data.setDescription('skip the song that is currently playing in the queue');

skip.execute = async interaction =>{
    interaction.reply('You call skip all songs from queue from music');
}

module.exports = skip;