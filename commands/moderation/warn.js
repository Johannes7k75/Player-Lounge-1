const logSchema = require('../../schemas/log-schema');
const mongo = require('../../other/mongo_local');
module.exports = {
    name: 'warn',
    aliases: [],
    category: 'Moderation',
    permissions: [],
    utilisation: '{prefix}warn [Mention] [Reason]',

    async execute(client, message, args) {
        if (!args[0]) return;
        if (args.length === 0) return;
        if (message.mentions.users.size > 0) {
            user = message.mentions.users.first();
            reason = args.slice(1).join(' ');
            date = Math.floor(Date.now() / 1000);

            guildId = message.guild.id;
            userId = user.id;
            userName = user.username;
            from = message.author.id;
            console.log(guildId, userId, userName);
            await mongo().then(async (mongoose) => {
                try {
                    console.log('Connected To Mongo Local');
                    const result = await logSchema.findOneAndUpdate(
                        {
                            guildId,
                            userId,
                        },
                        {
                            guildId,
                            userId,
                            userName,
                            $push: {
                                warnings: [
                                    {
                                        from,
                                        reason: reason,
                                        date: date,
                                    },
                                ],
                            },
                        },
                        {
                            upsert: true,
                            new: true,
                        }
                    );
                } finally {
                    mongoose.connection.close();
                }
            });
            client.users.cache.get(user.id).send(`**${message.member.guild.name}:** You have been ⚠ Warned\n**Reason:** ${reason}`);
            client.channels.cache.get('733209511971651635').send({
                embed: {
                    author: {
                        name: message.author.username + '#' + message.author.discriminator + ` (ID ${message.author.id})`,
                        icon_url: message.author.displayAvatarURL({ dynamic: false, fomat: 'png' }),
                    },
                    description: '**⚠ Warned `' + user.username + '#' + user.discriminator + '`** ' + '*(ID ' + user.id + ')*' + `\n📄 **Reason:** ${reason}`,
                    color: '#FCA253',
                    thumbnail: {
                        url: user.displayAvatarURL({ dynamic: false, fomat: 'png' }),
                    },
                },
            });
        } else {
            return message.channel.send('Mention a user to use the command');
        }
        // console.log(args[0]);
        // args_len = args.length;

        // console.log(args.length - 1);
    },
};
