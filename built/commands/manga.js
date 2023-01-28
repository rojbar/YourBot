"use strict";
const Command = require('../core/command.js');
const { sources } = require('../librarys/manga-scraping-tool/sources.js');
const manga = new Command();
manga.data.setName('manga');
manga.data.setDescription('It allows you to read manga!');
manga.loadSubcommands();
manga.sources = sources;
module.exports = manga;
