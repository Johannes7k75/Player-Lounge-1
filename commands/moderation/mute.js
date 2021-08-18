const logSchema = require('../../schemas/log-schema');
const mongo = require('../../other/mongo_local');
module.exports = {
    name: 'mute',
    aliases: [],
    category: 'Moderation',
    permissions: [],
    utilisation: '{prefix}mute [user]',

    async execute(client, message, args) {
        const target = message.mentions.users.first();
        const ms = require('ms');
        if (target) {
            let mainRole = message.guild.roles.cache.find((role) => role.name === '💳Verifiziert💳');
            let muteRole = message.guild.roles.cache.find((role) => role.name === 'Muted');

            let memberTarget = message.guild.members.cache.get(target.id);

            if (!args[1]) {
                memberTarget.roles.remove(mainRole.id);
                memberTarget.roles.add(muteRole.id);
                message.channel.send(`<@${memberTarget.user.id}> has been muted`);
                return;
            }

            user = message.mentions.users.first();
            reason = args.slice(1).join(' ');
            date = Math.floor(Date.now() / 1000);
            guildId = message.guild.id;
            userId = user.id;
            userName = user.username;
            from = message.author.id;

            await mongo().then(async (mongoose) => {
                try {
                    console.log('Connected To Mongo Local');
                    await logSchema.findOneAndUpdate(
                        {
                            guildId,
                            userId,
                        },
                        {
                            guildId,
                            userId,
                            userName,
                            $push: {
                                mutes: [
                                    {
                                        from,
                                        reason: reason,
                                        date: date,
                                        removed: false,
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
            // memberTarget.roles.remove(mainRole.id);
            memberTarget.roles.add(muteRole.id);
            message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`);

            setTimeout(function () {
                memberTarget.roles.remove(muteRole.id);
                // memberTarget.roles.add(mainRole.id);
            }, ms(args[1]));
        } else {
            message.channel.send('Cant find that member!');
        }
    },
};
