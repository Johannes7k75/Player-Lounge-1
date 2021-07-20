module.exports = {
    name: 'ban',
    aliases: [],
    category: 'moderation',
    permissions: ['BAN_MEMBERS'],
    utilisation: '{prefix}ban [Mention] [Reason]',

    execute(client, message, args) {
        if (!message.guild) return;
        if (!args[1]) return message.reply('Specify a reson');
        reason = args.slice(1).join(' ');
        if (message.mentions.users.size > 0) {
            user = message.mentions.users.first();
        } else {
            user = client.users.cache.get(args[0]);
        }
        if (user) {
            const member = message.guild.member(user);
            if (member) {
                member
                    .ban({ reason: reason })
                    .then(() => {
                        client.users.cache.get(user.id).send(`**${message.member.guild.name}:** You have been 🔨 Banned\n**Reason:** ${reason}`);
                        client.channels.cache.get('733209511971651635').send({
                            embed: {
                                author: {
                                    name: message.author.username + '#' + message.author.discriminator + ` (ID ${message.author.id})`,
                                    icon_url: message.author.displayAvatarURL({ dynamic: false, fomat: 'png' }),
                                },
                                description: '**🔨 Banned `' + user.username + '#' + user.discriminator + '`** ' + '*(ID ' + user.id + ')*' + `\n📄 **Reason:** ${reason}`,
                                color: '#D64848',
                                thumbnail: {
                                    url: user.displayAvatarURL({ dynamic: false, fomat: 'png' }),
                                },
                            },
                        });
                    })
                    .catch((err) => {
                        message.reply('I was unable to ban the member\nError:' + err);
                    });
            } else {
                message.reply("That user isn't in this guild!");
            }
        } else {
            message.reply("You didn't mention the user to ban!");
        }
    },
};
