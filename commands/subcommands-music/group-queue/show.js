const SubCommand = require('../../../core/subcommand.js');

const show = new SubCommand();
show.data.setName('show');
show.data.setDescription('show all songs in the queue');

show.execute = async interaction =>{
    interaction.reply('You call show all songs from queue from music');
}

module.exports = show;