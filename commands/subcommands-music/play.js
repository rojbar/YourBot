const SubCommand = require('../../core/subcommand');

const play = new SubCommand();
play.data.setName('play');
play.data.setDescription('play a song!');
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

