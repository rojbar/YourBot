const Command  = require('../core/command.js');
const cheerio = require('cheerio');
const axios = require('axios');
const {MessageEmbed} = require('discord.js');

const help = new Command();

help.data.setName('wiki')
help.data.setDescription('Search anything on wikipedia.com');
help.data.addStringOption(      
    option => 
        option.setName('query')
          .setDescription('What you want to search')
          .setRequired(true)
);

help.execute = async (interaction) =>{

	await interaction.deferReply();

	axios.get(`https://en.wikipedia.org/wiki/${interaction.options.getString('query').trim().replace(/ /g, '_')}`).then(
		res =>{
			const $ = cheerio.load(res.data);
	
			const reply = new MessageEmbed().setTitle(`Wiki:`);
			let resp =  $('#mw-content-text div:first-child p').text().toString();
			
			

			let image = $('.image img:first-child').attr('src');

			if(resp === undefined)
			{
				interaction.followUp(`Couldn't find it`);
			}
			else{
				a = resp.slice(0,800);
				a = `${a}... [continue here](https://en.wikipedia.org/wiki/${interaction.options.getString('query').trim().replace(/ /g, '_')})`;
				reply.addField(`${interaction.options.getString('query')}`.toUpperCase(), a, true);
			
				if(typeof image !== undefined)
					reply.setThumbnail(`https:${image}`);
					
				interaction.followUp({embeds: [reply]});
			}
		}
	).catch(err =>{

		interaction.followUp(`Couldn't find it`);
		//console.log(err);
	});

	
};

module.exports = help;