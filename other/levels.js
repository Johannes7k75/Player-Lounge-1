const config = require('../config/bot');
const mongo = require('./mongo');
const profileSchema = require('../schemas/profile-schema');

module.exports = async(client) => {
	client.on('message', async(message) => {
		if (message.author.bot || message.channel.type === 'dm') {
			return;
		}
		let mute = message.guild.roles.cache.find((r) => r.name === 'Muted');
		if (message.content.startsWith(config.discord.prefix) || message.content.startsWith('o!') || message.content.startsWith('c!') || message.content.startsWith('t!') || message.member.roles.cache.has(mute.id) || message.author.id === '811946572300156998') return;
		const { guild, member } = message;
		// Math.random() * (max - min) + min) generiert zufallszahl zwischen min und max
		addXP(guild.id, member.id, member.user.username, Math.round(Math.random() * (20 - 10) + 10), message);
	});
	client.on('guildMemberAdd', (member) => updateStatus(member, true));
	client.on('guildMemberRemove', (member) => updateStatus(member, false));
};
const getNeededXP = (level) => level * level * 100;

const updateStatus = async (member, status) => {
	await mongo().then(async (mongoose) => {
		try {
			await profileSchema
				.findOne(
					{
						userId: member.id,
						guildId: member.guild.id,
					},
					{
						onServer: status,
					}
				)
				.catch(console.log);
		} finally {
			mongoose.connection.close();
		}
	});
};

const addXP = async (guildId, userId, userName, xpToAdd, message) => {
	await mongo().then(async (mongoose) => {
		try {
			const result = await profileSchema.findOneAndUpdate(
				{
					guildId,
					userId,
					userName,
				},
				{
					guildId,
					userId,
					userName,
					$inc: {
						xp: xpToAdd,
						totalxp: xpToAdd,
					},
				},
				{
					upsert: true,
					new: true,
				}
			);

			let { xp, level } = result;
			const needed = getNeededXP(level);
			console.log('Added ' + message.member.user.username + ' ' + xpToAdd + ' level');
			if (xp >= needed) {
				++level;
				xp -= needed;

				message.reply(`You are now level ${level} with ${xp} experience! You now need ${getNeededXP(level)} XP to level up again.`);

				await profileSchema.updateOne(
					{
						guildId,
						userId,
						userName,
					},
					{
						level,
						xp,
					}
				);
			}
		} finally {
			mongoose.connection.close();
		}
	});
};

module.exports.addXP = addXP;
