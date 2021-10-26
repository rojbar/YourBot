const SubCommand = require('../../core/subcommand');

const queue = new SubCommand();
queue.data.setName('queue');
queue.data.setDescription('Songs in the queue');


queue.execute = async interaction =>{
    interaction.reply('You call queue from music');
}

module.exports = queue;

