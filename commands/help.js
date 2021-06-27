const Command = require('../core/command.js');
const Discord = require('discord.js');
const help = new Command();
help.setName('help');
help.setDescription('This command will show you useful informationa about the bot');
help.setHasArgs(false);
help.setCooldown(5);
help.execute = async function(message, args)
{
    message.channel.send("webpage link for help(use github.io for the webpage)");
}
module.exports = help;