const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('../config.json');
const fs = require('fs');
const path = require('path');

let  myArgs = process.argv.slice(2);
const commands = [];
const dirpath = path.join(__dirname	,'..','commands');

const commandFiles = fs.readdirSync(dirpath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(dirpath, "/", file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		if(myArgs[0] === 'true'){
			console.log('Type of register: Global.');
			await rest.put(
				Routes.applicationCommands(clientId),
				{ body: commands },
			);
		}
		else{
			console.log('Type of register: Local.');
			await rest.put(
				Routes.applicationGuildCommands(clientId, guildId),
				{ body: commands },	);
		}

		console.log('Successfully reloaded application (/) commands.');
        
	} catch (error) {
		console.error(error);
	}

})();
