const SubCommand = require('../../core/subcommand');

const search = new SubCommand();
search.data.setName('search');
search.data.setDescription('Search a song!');
search.data.addStringOption(
    option => 
        option.setName('song')
              .setDescription('The name of the song')
              .setRequired(true)
);

search.execute = async interaction =>{
    interaction.reply('You call search from music');
}

module.exports = search;
