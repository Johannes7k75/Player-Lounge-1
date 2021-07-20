module.exports = {
    name: 'unban',
    aliases: [],
    category: 'moderation',
    permissions: ['BAN_MEMBERS'],
    permissions: [],
    utilisation: '{prefix}unban [ID] <Reason>',

    async execute(client, message, args) {
        if (!message.guild) return;
        // const user = message.mentions.users.first();
        console.log(typeof args[0]);
        const user = await message.guild.members.unban(args[0]);
        if (args.length >= 2) {
            reason = args.slice(1).join(' ');
        } else {
            reason = '(Not specified)';
        }
        client.channels.cache.get('733209511971651635').send({
            embed: {
                author: {
                    name: message.author.username + '#' + message.author.discriminator + ` (ID ${message.author.id})`,
                    icon_url: message.author.displayAvatarURL({ dynamic: false, fomat: 'png' }),
                },
                description: '**🔓 Unbanned `' + user.username + '#' + user.discriminator + '`** ' + '*(ID ' + user.id + ')*' + `\n📄 **Reason:** ${reason}`,
                color: '#63C65F',
                thumbnail: {
                    url: user.displayAvatarURL({ dynamic: false, fomat: 'png' }),
                },
            },
        });
    },
};
