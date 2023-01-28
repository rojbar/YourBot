"use strict";
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
let myArgs = process.argv.slice(2);
const commands = [];
const dirpath = path.join(__dirname, '..', 'commands');
const commandFiles = fs.readdirSync(dirpath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const filePath = path.join(dirpath, "/", file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}
const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);
(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        if (myArgs[0] === 'true') {
            console.log('Type of register: Global.');
            await rest.put(Routes.applicationCommands(process.env.CLIENTID), { body: commands });
        }
        else {
            console.log('Type of register: Local.');
            await rest.put(Routes.applicationGuildCommands(process.env.CLIENTID, process.env.GUILDID), { body: commands });
        }
        console.log('Successfully reloaded application (/) commands.');
    }
    catch (error) {
        console.error(error);
    }
})();
