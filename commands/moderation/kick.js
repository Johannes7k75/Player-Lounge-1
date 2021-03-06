module.exports = {
    name: 'kick',
    aliases: [],
    category: 'Moderation',
    permissions: ['KICK_MEMBERS'],
    utilisation: '{prefix}kick [@User] [Reason]',

    async execute(client, message, args) {
        if (!message.guild) return;
        if (!args[1]) return message.reply('Specify a reson');
        if (message.mentions.users.size > 0) {
            user = message.mentions.users.first();
        } else {
            user = client.users.cache.get(args[0]);
        }
        reason = args.slice(1).join(' ');
        if (user) {
            const member = message.guild.members.cache.get(user.id);
            console.log(member);
            if (member) {
                // if (message.mentions.users.size > 0) {
                // user = message.mentions.users.first();
                // reason = args.slice(1).join(' ');
                // date = Math.floor(Date.now() / 1000);
                // guildId = message.guild.id;
                // userId = user.id;
                // userName = user.username;
                // from = message.author.id;
                // console.log(guildId, userId, userName);
                //     await mongo().then(async (mongoose) => {
                //         try {
                //             console.log('Connected To Mongo Local');
                //             await logSchema.findOneAndUpdate(
                //                 {
                //                     guildId,
                //                     userId,
                //                 },
                //                 {
                //                     guildId,
                //                     userId,
                //                     userName,
                //                     $push: {
                //                         kicks: [
                //                             {
                //                                 from,
                //                                 reason: reason,
                //                                 date: date,
                //                             },
                //                         ],
                //                     },
                //                 },
                //                 {
                //                     upsert: true,
                //                     new: true,
                //                 }
                //             );
                //         } finally {
                //             mongoose.connection.close();
                //         }
                //     });
                // }
                member
                    .kick(reason)
                    .then(() => {
                        client.users.fetch(user.id).then((user) => {
                            user.send(`**${message.member.guild.name}:** You have been ???? Kicked\n**Reason:** ${reason}`);
                        });
                        client.channels.cache.get('733209511971651635').send({
                            embed: {
                                author: {
                                    name: message.author.username + '#' + message.author.discriminator + ` (ID ${message.author.id})`,
                                    icon_url: message.author.displayAvatarURL({ dynamic: false, fomat: 'png' }),
                                },
                                description: '**???? Kicked `' + user.username + '#' + user.discriminator + '`** ' + '*(ID ' + user.id + ')*' + `\n???? **Reason:** ${reason}`,
                                color: '#F2A013',
                                thumbnail: {
                                    url: user.displayAvatarURL({ dynamic: false, fomat: 'png' }),
                                },
                            },
                        });
                        message.reply(`${user.username} was kicked from the server`, true);
                    })
                    .catch((err) => {
                        message.reply('I was unable to kick the member\nError: ' + err);
                    });
            } else {
                // The mentioned user isn't in this guild
                message.reply("That user isn't in this guild!");
            }
        } else {
            message.reply("You didn't mention the user to kick!");
        }
    },
};
