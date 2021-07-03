const Discord = require('discord.js');
const client = new Discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'USER', 'REACTION'],
	disableMentions: 'everyone',
});
console.log('test')
client.chalk = require('chalk') 
client.config = require('./config/bot');
client.commands = new Discord.Collection();
client.events = new Discord.Collection();


['command_handler', 'event_handler'].forEach((handler) => {
	require(`./handlers/${handler}`)(client, Discord);
});

client.login(client.config.discord.token);