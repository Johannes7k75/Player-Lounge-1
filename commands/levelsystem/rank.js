const { registerFonts } = require('canvacord/src/Canvacord');

module.exports = {
    name: 'rank',
    aliases: ['level'],
    category: 'levelsystem',
    utilisation: '{prefix}rank',
    permission: 'everyone',

    async execute(client, message, args) {
        if (message.channel.id != '743865087416074270' && message.channel.id != '733195953170939915' && message.channel.id != '850776264457584650') return;
        const Discord = require('discord.js');
        const canvacord = require('canvacord');
        const mongo = require('../../other/mongo');
        const profileSchema = require('../../schemas/profile-schema');

        await mongo().then(async (mongoose) => {
            try {
                if (message.mentions.users.size > 0) {
                    if (message.mentions.users.first().bot === true) {
                        return message.channel.send('The User you mentioned was to lazzy to write messages!');
                    }
                    const result = await profileSchema.findOne({
                        userId: message.mentions.users.first().id,
                    });
                    if (result === null) {
                        return message.channel.send('The user you mentioned has no Xp');
                    }
                    let { guildId, userId, xp, totalxp, level, bgimg } = result;

                    var users = await profileSchema
                        .find({ guildId: message.mentions.members.first().guild.id })
                        .sort([['totalxp', 'descending']])
                        .exec();
                    const position = users.slice(0, 10).findIndex((i) => i.guildId === message.mentions.members.first().guild.id && i.userId === message.mentions.users.first().id) + 1;

                    const rank = new canvacord.Rank()
                        .setAvatar(message.mentions.users.first().displayAvatarURL({ dynamic: false, format: 'png' }))
                        .setCurrentXP(xp)
                        .registerFonts([{ path: './fonts/Roboto-Thin.ttf', face: { family: 'Roboto' } }])
                        .setRequiredXP(parseInt(level * level * 100))
                        .setLevel(level)
                        .setRank(position)
                        .setStatus(message.mentions.users.first().presence.status, true)
                        .setProgressBar('#FFA500', 'COLOR')
                        .setUsername(message.mentions.users.first().username)
                        .setDiscriminator(message.mentions.users.first().discriminator)
                        .setOverlay('#00000', 0.7);

                    if (bgimg) {
                        rank.setBackground('IMAGE', bgimg);
                    }
                    rank.build().then((data) => {
                        const attatchment = new Discord.MessageAttachment(data, 'card.png');
                        message.channel.send(attatchment);
                    });
                } else {
                    const result = await profileSchema.findOne({
                        userId: message.member.user.id,
                    });
                    if (result === null) {
                        return message.channel.send('You dont have any Xp');
                    }

                    let { guildId, userId, xp, totalxp, level, bgimg } = result;

                    // get the position in the leaderboard
                    var users = await profileSchema
                        .find({ guildId: message.member.guild.id })
                        .sort([['totalxp', 'descending']])
                        .exec();
                    const position = users.slice(0, 10).findIndex((i) => i.guildId === message.member.guild.id && i.userId === message.member.user.id) + 1;

                    const rank = new canvacord.Rank()
                        .setAvatar(message.author.displayAvatarURL({ dynamic: false, format: 'png' }))
                        .setCurrentXP(xp)
                        .registerFonts([{ path: './fonts/Roboto-Thin.ttf', face: { family: 'Roboto' } }])
                        .setRequiredXP(parseInt(level * level * 100))
                        .setLevel(level)
                        .setRank(position)
                        .setStatus(message.member.presence.status, true)
                        .setProgressBar('#FFA500', 'COLOR')
                        .setUsername(message.author.username)
                        .setDiscriminator(message.author.discriminator)
                        .setOverlay('#00000', 0.7);

                    if (bgimg) {
                        rank.setBackground('IMAGE', bgimg);
                    }
                    rank.build().then((data) => {
                        const attatchment = new Discord.MessageAttachment(data, 'card.png');
                        message.channel.send(attatchment);
                    });
                }
            } finally {
                mongoose.connection.close();
            }
        });
    },
};
