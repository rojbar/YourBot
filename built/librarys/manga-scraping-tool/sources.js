"use strict";
const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
function getSources() {
    const dirpath = path.resolve('./librarys/manga-scraping-tool/sources/');
    const sourceFiles = fs.readdirSync(dirpath).filter(file => file.endsWith('.js'));
    const sources = new Discord.Collection();
    for (const file of sourceFiles) {
        const source = require(`${dirpath}/${file}`);
        sources.set(source.name, source);
    }
    console.log("Loaded sources for command manga!");
    return sources;
}
module.exports = { sources: getSources() };
