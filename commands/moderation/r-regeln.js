const rrclaim = require('../rr-message/test');
const updateMembers = require('../../counters/member-counter')

module.exports = (client) => {
	const channelId = '747870506262462474';

	const getEmoji = (emojiName) => client.emojis.cache.find((emoji) => emoji.name === emojiName);

	const emojis = {
		creditcard: '💳Verifiziert💳',
	};

	const reactions = [];

	let emojiText =
		'Bestätige mit :credit_card: das du die Regeln gelesen hast, um andere Känele zu sehen.\n\n' +
		'```html' +
		'\n<Respekt>\n' +
		'Seid Respektvoll und Freundlich zu den Mitgliedern und auch dem Server Team.\n\n' +
		'<Werbung>\n' +
		'Werbung für andere Server wird ohne absprache mit den Owner/Admin nicht geduldet.\n\n' +
		'<Beleidigungen>\n' +
		'Beleidigungen und rassistischen bzw. diskriminierende äußerungen sind nicht erlaubt.\n\n' +
		'<Talks>\n' +
		'Channelhopping, Störgeräusche, Soundbords oder Pfeifen sind nicht erwünscht, und können zu einem Mute führen.\n\n' +
		'<Chat>\n' +
		'Kein spam und keine sinnlosen @ Erwähnungen.\n\n' +
		'<Discord-TOS>\n'+
		'Halte dich an die generellen TOS von Discord'+
		'```';
	for (const key in emojis) {
		const emoji = getEmoji(key);
		reactions.push(emoji);
	}

	rrclaim(client, channelId, emojiText, reactions);

	const handleReaction = (reaction, user, add) => {
		if (user.id === '743800065650327572') {
			return;
		}
		updateMembers(client)

		const emoji = reaction._emoji.name;
		const { guild } = reaction.message;

		const roleName = emojis[emoji];
		if (!roleName) {
			return;
		}
		updateMembers(client)
		const role = guild.roles.cache.find((role) => role.name === roleName);
		const status = guild.roles.cache.get('775377928610775090');
		const roelPL = guild.roles.cache.get('844219922338938920');
		const member = guild.members.cache.find((member) => member.id === user.id);

		if (add) {
			member.roles.add(role).catch(console.log);
			member.roles.add(status).catch(console.log);
			member.roles.add(roelPL).catch(console.log);
		} else {
			member.roles.remove(role).catch(console.log);
			member.roles.remove(status).catch(console.log);
			member.roles.remove(roelPL).catch(console.log);
		}
	};

	client.on('messageReactionAdd', (reaction, user) => {
		if (reaction.message.channel.id === channelId) {
			handleReaction(reaction, user, true);
		}
	});

	client.on('messageReactionRemove', (reaction, user) => {
		if (reaction.message.channel.id === channelId) {
			handleReaction(reaction, user, false);
		}
	});
};

// process.on('unhandledRejection', error => {
// 	console.error('Unhandled promise rejection:', error);
// });
