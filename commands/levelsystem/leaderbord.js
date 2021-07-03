/**
 * @format
 */
module.exports = {
	name: 'leaderbord',
	aliases: ['lb'],
	category: 'levelsystem',
	utilisation: '{prefix}leaderbord',
	permission: 'everyone',

	async execute(client, message, args) {
		const Discord = require('discord.js');
		const Util = require('../../node_modules/canvacord/plugins/Util');
		const mongo = require('../../mongo');
		const profileSchema = require('../../schemas/profile-schema');
		var cpage;
		var rpage;

		// await message.delete();
		//Grab all of the users in said server
		await mongo().then(async (mongoose) => {
			try {
				const result = await profileSchema
					.find({
						guildId: message.member.guild.id,
					})
					.sort([['totalxp', 'descending']])
					.exec()
					.catch(console.log);
				const { userId, xptotal, username, level } = result;

				let embed = new Discord.MessageEmbed().setTitle('Leaderboard');

				//if there are no results
				if (result.length === 0) {
					embed.setColor('RED');
					embed.addField('No data found', 'Please type in chat to gain coins!');
				} else if (result.length < 10) {
					//less than 10 results
					embed.setColor('BLURPLE');
					for (i = 0; i < result.length; i++) {
						let member = message.guild.members.cache.get(result[i].userId) || 'User Left';
						if (member === 'User Left') {
							embed.addFields({ name: `#${i + 1} ||${Util.shorten(result[i].userName, 20)}|| [User Left]`, value: `||**${result[i].level} lvl** ` + '`' + Util.toAbbrev(result[i].xp) + ' XP' + '`||' });
						} else {
							embed.addFields({ name: `#${i + 1} ${Util.shorten(result[i].userName, 20)}`, value: `**${result[i].level} lvl** ` + '`' + Util.toAbbrev(result[i].xp) + ' XP' + '`' });
						}
					}
				} else {
					//more than 10 results
					const page = Math.ceil(result.length / 10);
					cpage = 1;
					rpage = result.length;
					embed.setColor('BLURPLE');
					embed.setTitle('Leaderboard (1/' + page + ')');
					for (i = 0; i < 10; i++) {
						let member = message.guild.members.cache.get(result[i].userId) || 'User Left';
						if (member === 'User Left') {
							embed.addFields({ name: `#${i + 1} ||${Util.shorten(result[i].userName, 20)}|| [User Left]`, value: `||**${result[i].level} lvl** ` + '`' + Util.toAbbrev(result[i].xp) + ' XP' + '`||' });
						} else {
							embed.addFields({ name: `#${i + 1} ${Util.shorten(result[i].userName, 20)}`, value: `**${result[i].level} lvl** ` + '`' + Util.toAbbrev(result[i].xp) + ' XP' + '`' });
						}
					}
				}
				message.channel.send(embed).then((embedMessage) => {
					embedMessage.react('◀️');
					embedMessage.react('⏺️');
					embedMessage.react('▶️');
				});
				client.on('messageReactionAdd', async (reaction, user) => {
					try {
						await reaction.fetch();
						await user.fetch();
					} catch (err) {
						console.log(err);
					}
					const reaction_name = reaction.emoji.name;
					const Discord = require('discord.js');
					if (user.bot) {
						return;
					}
					if (reaction_name === '◀️') {
						cpage--;
					}
					if (reaction_name === '▶️') {
						cpage++;
					}
					if (cpage > Math.ceil(result.length / 10)) {
						cpage--;
						return;
					} else {
						const { title, description, color, timestamp, author, fields } = reaction.message.embeds[0];

						const embedc = new Discord.MessageEmbed();
						embedc.setTitle(`Leaderboard (${cpage}/${Math.ceil(rpage / 10)})`);
						embedc.setColor('BLURPLE');
						embedc.spliceFields(0, 10);
						if (result.length - cpage * 10 < cpage) {
							for (i = cpage * 10 - 10; i < result.length; i++) {
								let member = message.guild.members.cache.get(result[i].userId) || 'User Left';
								if (member === 'User Left') {
									embedc.addFields({ name: `#${i + 1} ||${Util.shorten(result[i].userName, 20)}|| [User Left]`, value: `||**${result[i].level} lvl** ` + '`' + Util.toAbbrev(result[i].xp) + ' XP' + '`||' });
								} else {
									embedc.addFields({ name: `#${i + 1} ${Util.shorten(result[i].userName, 20)}`, value: `**${result[i].level} lvl** ` + '`' + Util.toAbbrev(result[i].xp) + ' XP' + '`' });
								}
							}
						} else {
							for (i = cpage * 10 - 10; i < cpage * 10; i++) {
								let member = message.guild.members.cache.get(result[i].userId) || 'User Left';
								if (member === 'User Left') {
									embedc.addFields({ name: `#${i + 1} ||${Util.shorten(result[i].userName, 20)}|| [User Left]`, value: `||**${result[i].level} lvl** ` + '`' + Util.toAbbrev(result[i].xp) + ' XP' + '`||' });
								} else {
									embedc.addFields({ name: `#${i + 1} ${Util.shorten(result[i].userName, 20)}`, value: `**${result[i].level} lvl** ` + '`' + Util.toAbbrev(result[i].xp) + ' XP' + '`' });
								}
							}
						}
						message.channel.send(embedc);
						// reaction.message.edit(embedc);
					}
				});
			} finally {
				mongoose.connection.close();
			}
		});
	},
};
