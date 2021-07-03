const updateMembers = require('../../counters/member-counter');
const rrclaimgames = require('../../commands/rr-claim/rr-claim');
const rregeln = require('../../commands/moderation/r-regeln');
const mongo = require('../../mongo');
const levels = require('../../levels');

module.exports = async (client) => {
	console.log('Player-Lounge Bot is Online!');
	console.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} members and a total of ${client.guilds.cache.get('685176247726374961').roles.cache.get('765985461096677457').members.size} of users`);
	client.user.setActivity(`${client.config.discord.prefix}help | bit.ly/3qUjF5i`, { type: 'PLAYING', url: 'https://www.Player-Lounge.de/' });
	updateMembers(client);
	rrclaimgames(client);
	rregeln(client);
	levels(client);
	await mongo()
		.then((mongoose) => {
			try {
				console.log('Connected to mongo!');
			} finally {
				mongoose.connection.close();
			}
		})
		.catch(console.log);
};
