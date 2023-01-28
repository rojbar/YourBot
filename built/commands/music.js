"use strict";
const Command = require('../core/command.js');
const music = new Command();
music.data.setName('music');
music.data.setDescription('Soon we will send you your music!');
music.loadSubcommands();
music.loadSubGroups();
module.exports = music;
