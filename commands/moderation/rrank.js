const { rols } = require('../../config/bot');
module.exports = {
    name: 'rrank',
    aliases: [],
    category: 'Moderation',
    permissions: [],
    role_permissions: [rols.dev],
    utilisation: '{prefix}rrank [@User] [up/down]',

    execute(client, message, args) {
        function getIndexOfHoistRole(userid, rankRols) {
            let hoistrole = message.guild.members.cache.get(userid).roles.hoist;
            if (hoistrole === null) {
                hoistrole = rols.verifiziert[0];
            } else {
                hoistrole = hoistrole.id;
            }
            indexOfHoist = rankRols.indexOf(hoistrole);
            return indexOfHoist;
        }

        const rankRols = [
            rols.owner[0],
            rols.admin[0],
            rols.moderator[0],
            rols.supporter[0],
            // cosupporter: rols.cosupporter,
            rols.verifiziert[0],
        ];

        const plRols = [
            rols.owner[2],
            rols.admin[2],
            rols.moderator[2],
            rols.supporter[2],
            // cosupporter: rols.cosupporter,
            rols.verifiziert[2],
        ];
        if (!args[0] || args[0].toLowerCase() === ('up' || 'down')) {
            return message.channel.send(`Please Mention an user`);
        }

        const authorindex = getIndexOfHoistRole(message.author.id, rankRols);
        const mentionindex = getIndexOfHoistRole(message.mentions.users.first().id, rankRols);

        user = message.mentions.users.first()
        let embed = {}

        console.log('Author != Mention');
        if (args[1].toLowerCase() === 'up') {
            if (authorindex + 1 >= mentionindex) {
                return message.channel.send(`You can not Upgrade a User with the same / higher Role`);
            }
            if (rankRols[mentionindex] === rankRols[4]) {
                client.guilds.cache
                    .get(message.guild.id)
                    .members.cache.get(message.mentions.users.first().id)
                    .roles.add(rankRols[mentionindex - 1]);
                client.guilds.cache
                    .get(message.guild.id)
                    .members.cache.get(message.mentions.users.first().id)
                    .roles.add(plRols[mentionindex - 1]);
                client.guilds.cache.get(message.guild.id).members.cache.get(message.mentions.users.first().id).roles.remove(plRols[mentionindex]);
            } else {
                client.guilds.cache
                    .get(message.guild.id)
                    .members.cache.get(message.mentions.users.first().id)
                    .roles.add(rankRols[mentionindex - 1]);
                client.guilds.cache
                    .get(message.guild.id)
                    .members.cache.get(message.mentions.users.first().id)
                    .roles.add(plRols[mentionindex - 1]);
                client.guilds.cache.get(message.guild.id).members.cache.get(message.mentions.users.first().id).roles.remove(rankRols[mentionindex]);
                client.guilds.cache.get(message.guild.id).members.cache.get(message.mentions.users.first().id).roles.remove(plRols[mentionindex]);
            }
            embed = {
                embed: {
                    author: {
                        name: message.author.username + '#' + message.author.discriminator + ` (ID ${message.author.id})`,
                        icon_url: message.author.displayAvatarURL({ dynamic: false, fomat: 'png' }),
                    },
                    description: `**User: \`${user.username}#${user.discriminator}\`** *(ID ${user.id})*\n📄 Was ranked up to:** ${client.guilds.cache.get(message.guild.id).roles.cache.get(rankRols[mentionindex - 1]).name.replaceAll('☆', '').trim()}**`,

                }
            }

            client.channels.cache.get('832748810324541440').send({ embed: { color: '#d17e43', title: ':confetti_ball: :tada: Rank Up', description: `Herzlichen Glückwunsch <@${user.id}> du bis jetzt **${client.guilds.cache.get(message.guild.id).roles.cache.get(rankRols[mentionindex - 1]).name.replaceAll('☆', '').trim()}** :confetti_ball: :tada:` } })
        } else if (args[1].toLowerCase() === 'down') {
            if (mentionindex + 1 >= rankRols.length) {
                return message.channel.send(`${message.mentions.users.first().username} has already the lowest role: \`${message.guild.roles.cache.get(rankRols[rankRols.length - 1]).name}\``);
            } else {
                console.log(rankRols[mentionindex + 1]);
                client.guilds.cache
                    .get(message.guild.id)
                    .members.cache.get(message.mentions.users.first().id)
                    .roles.add(rankRols[mentionindex + 1]);
                client.guilds.cache
                    .get(message.guild.id)
                    .members.cache.get(message.mentions.users.first().id)
                    .roles.add(plRols[mentionindex + 1]);
                client.guilds.cache.get(message.guild.id).members.cache.get(message.mentions.users.first().id).roles.remove(rankRols[mentionindex]);
                client.guilds.cache.get(message.guild.id).members.cache.get(message.mentions.users.first().id).roles.remove(plRols[mentionindex]);
            }
            embed = {
                embed: {
                    author: {
                        name: message.author.username + '#' + message.author.discriminator + ` (ID ${message.author.id})`,
                        icon_url: message.author.displayAvatarURL({ dynamic: false, fomat: 'png' }),
                    },
                    description: `**User: \`${user.username}#${user.discriminator}\`** *(ID ${user.id})*\n📄 Was ranked down to:** ${client.guilds.cache.get(message.guild.id).roles.cache.get(rankRols[mentionindex]).name.replaceAll('☆', '').trim()}**`,

                }
            }
        }
        if (embed.author) {
            client.channels.cache.get('733209511971651635').send(embed)

        }
    },
};
