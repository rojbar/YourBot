const Module = require('../core/module.js');
const fs = require('fs');
const Discord = require('discord.js');
const Util = require('../core/util.js');
const {prefix} = require('../config.json');
const manga_manager = require('../databases/manga/seeders/manga_manager');


const manga = new Module();
manga.setName('manga');
manga.setDescription('It allows you to read manga!');
manga.setHasArgs(false);
manga.setUsage('used it without arguments!');
manga.setCooldown(5);
manga.loadCommands();

manga.loadSources = function()
{
	let pathTo = 'webScraperApi';
	const sourceScrapers = fs.readdirSync(pathTo).filter(file => file.endsWith('.js'));

	const collectionReturned = new Discord.Collection();
	for(const file of sourceScrapers)
	{
		const sourceScraper = require(`../${pathTo.concat(`/${file}`)}`);
		collectionReturned.set(sourceScraper.name, sourceScraper); //reviar por que getName no funciona
		console.log(sourceScraper.name+' loaded');
	}
	return collectionReturned;
}
manga.sources = manga.loadSources();


manga.execute = async function(message,args)
{
		const enviroment = await manga_manager.enviromentModel.findOrCreate({
			where: {
				user_id: message.author.id,
			},
			defaults: {
				user_id: message.author.id,
				default_source: 1,
				}
		});
		//enviroment es un arreglo donde el primer atributo es el modelo!

		message.author.createDM().then( DMChannel => {
			DMChannel.send("Manga Reader v1.0");

			const filter = m => m.content.startsWith(prefix) && !m.author.bot;
			const collector = DMChannel.createMessageCollector(filter);
			
			collector.on('collect', messageCollected => {

				if(messageCollected.content === '$exit')
				{
					DMChannel.send('See you later');
					collector.stop();
				}

				const arguments = Util.getMessageArgs(messageCollected, prefix);
				const commandName = Util.getMessageCommandName(arguments);

				if(!this.commands.has(commandName)) return;

				console.log('Recieved subcommand:'+commandName+' with arguments: '+arguments+' in Manga');
				
				const command = this.commands.get(commandName);

				if(command.getHasArgs() && !arguments.length)
					return messageCollected.channel.send(Util.replyArgumentsNoPassed(messageCollected, command));					
				

				//poner proteccion de spameo de comandos
				try
				{
					arguments.env = enviroment;
					arguments.dbManager = manga_manager;
					arguments.sources = this.sources;
					console.log('Subcommand: '+command.getName()+' is being executed in manga');
					command.execute(messageCollected,arguments).then().catch(error => console.log(error));
				}catch(error)
				{
					console.error(error);
					messageCollected.reply('there was an error trying to execute the command');
				}
			});

			collector.on('end', messagesCollected =>{
				DMChannel.messages.fetch({ limit: 10 }).then(messages => {
					  messages.forEach(element => {
						  if(element.author.bot)
						  	DMChannel.messages.delete(element).then().catch(error => console.log(error));
					  });
				  }).catch(console.error);
				this.emit('finished', message.author.id);				
			});
		});
}
module.exports = manga;
		
		
		
