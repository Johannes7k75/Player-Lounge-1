const logSchema = require('../../schemas/log-schema');
const mongo = require('../../other/mongo_local');

module.exports = {
    name: 'unmute',
    aliases: [],
    category: 'Moderation',
    permissions: [],
    utilisation: '{prefix}unmute [user]',
    async execute(client, message, args) {
        const target = message.mentions.users.first();
        if (target) {
            let mainRole = message.guild.roles.cache.find((role) => role.name === '💳Verifiziert💳');
            let muteRole = message.guild.roles.cache.find((role) => role.name === 'Muted');

            let memberTarget = message.guild.members.cache.get(target.id);

            memberTarget.roles.remove(muteRole.id);
            memberTarget.roles.add(mainRole.id);
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
                        const result = await logSchema.findOne({
                            guildId,
                            userId,
                        });
                        const { mutes } = result;
                        const { reason, from, date } = mutes[mutes.length - 1];
                        await logSchema.updateOne(
                            {
                                guildId,
                                userId,
                                'mutes.date': date,
                            },
                            {
                                userName,
                                $set: {
                                    'mutes.$.removed': true,
                                },
                            }
                        );
                    } finally {
                        mongoose.connection.close();
                    }
                });
            }
            message.channel.send(`<@${memberTarget.user.id}> has been unmuted`);
        } else {
            message.channel.send('Cant find that member!');
        }
    },
};
