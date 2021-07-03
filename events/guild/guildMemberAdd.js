module.exports = (client, member, message, Discord) => {
	// const updateMembers = require('../../counters/member-counter');
	// const guild = client.guilds.cache.get('685176247726374961');
	// updateMembers(guild);
	// console.log('Join Update Member');
	// if (member.id === '811946572300156998') return;
	client.channels.cache.get('685180208802037760').send(`Hey <@!${member.id}> Welcome in the **${member.guild.name}**:wave::grinning:`);
};