const Command = require('../../core/command.js');
const help = new Command();
help.setName('help');
help.setDescription('shows you the command');
help.setHasArgs(false);
help.setUsage('command');
help.setCooldown(5);
module.exports = help;
