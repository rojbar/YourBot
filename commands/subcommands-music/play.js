const SubCommand = require('../../core/subcommand');

const play = new SubCommand();
play.data.setName('search');
play.data.setDescription('Search a song!');
play.data.addStringOption(
    option => 
        option.setName('name')
              .setDescription('The name or url of the song')
              .setRequired(true)
);

play.execute = async interaction =>{
    interaction.reply('You call play from music');
}

module.exports = play;

