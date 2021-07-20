module.exports = {
    name: 'kick',
    aliases: [],
    category: 'moderation',
    permissions: ['KICK_MEMBERS'],
    utilisation: '{prefix}kick [Mention] [Reason]',

    execute(client, message, args) {
        if (!message.guild) return;
        if (!args[1]) return message.reply('Specify a reson');
        if (message.mentions.users.size > 0) {
            user = message.mentions.users.first();
        } else {
            user = client.users.cache.get(args[0]);
        }
        reason = args.slice(1).join(' ');
        if (user) {
            const member = message.guild.member(user);
            if (member) {
                member
                    .kick(reason)
                    .then(() => {
                        client.users.fetch(user.id).then((user) => {
                            user.send(`**${message.member.guild.name}:** You have been 👢 Kicked\n**Reason:** ${reason}`);
                        });
                        client.channels.cache.get('733209511971651635').send({
                            embed: {
                                author: {
                                    name: message.author.username + '#' + message.author.discriminator + ` (ID ${message.author.id})`,
                                    icon_url: message.author.displayAvatarURL({ dynamic: false, fomat: 'png' }),
                                },
                                description: '**👢 Kicked `' + user.username + '#' + user.discriminator + '`** ' + '*(ID ' + user.id + ')*' + `\n📄 **Reason:** ${reason}`,
                                color: '#F2A013',
                                thumbnail: {
                                    url: user.displayAvatarURL({ dynamic: false, fomat: 'png' }),
                                },
                            },
                        });
                    })
                    .catch((err) => {
                        message.reply('I was unable to kick the member\nError:' + err);
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
