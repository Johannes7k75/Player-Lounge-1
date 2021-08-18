const mongo = require('../../other/mongo');
const profileSchema = require('../../schemas/profile-schema');
const canvacord = require('canvacord');
const Discord = require('discord.js');
module.exports = {
    name: 'rankcard',
    aliases: ['rankc'],
    category: 'Levelsystem',
    permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    utilisation: '{prefix}rankcard [IMG URL]',

    async execute(client, message, args) {
        if (message.channel.id != '743865087416074270' && message.channel.id != '733195953170939915' && message.channel.id != '850776264457584650') return;

        if (!args[0]) {
            if (message.attachments.size === 0) {
                message.channel.send('You dont specified any image URL or attached an image.');
                return;
            }
        }

        if (args[0] === 'reset') {
            await mongo().then(async (mongoose) => {
                try {
                    const { guild, member } = message;
                    const guildId = guild.id;
                    const userId = member.id;
                    const userName = member.user.username;

                    const result = await profileSchema.findOne({
                        guildId,
                        userId,
                        userName,
                    });

                    const { imgurl } = result;
                    await profileSchema.findOneAndUpdate(
                        {
                            guildId,
                            userId,
                            userName,
                        },
                        {
                            $unset: { bgimg: imgurl },
                        }
                    );
                    message.channel.send('Reseted succesfully your Rankcard');
                } finally {
                    mongoose.connection.close();
                }
            });
            return;
        }

        if (message.attachments.size > 0 && !args[0]) {
            const { guild, member } = message;
            const guildId = guild.id;
            const userId = member.id;
            const userName = member.user.username;
            const imgurl = message.attachments.first().url;

            await mongo().then(async (mongoose) => {
                try {
                    const result = await profileSchema.findOneAndUpdate(
                        {
                            guildId,
                            userId,
                            userName,
                        },
                        {
                            guildId,
                            userId,
                            userName,

                            bgimg: imgurl,
                        },
                        {
                            upsert: true,
                            new: true,
                        }
                    );
                    let { bgimg } = result;

                    bgimg = imgurl;
                    await profileSchema.updateOne(
                        {
                            guildId,
                            userId,
                            userName,
                        },
                        {
                            bgimg,
                        }
                    );
                    // message.channel.send('Succesfully set your rankcard to ' + message.attachments.first().url)
                    const rank = new canvacord.Rank()
                        .setAvatar(message.author.displayAvatarURL({ dynamic: false, format: 'png' }))
                        .setUsername(message.author.username)
                        .setDiscriminator(message.author.discriminator)
                        .setBackground('IMAGE', bgimg);
                    rank.build().then((data) => {
                        const attatchment = new Discord.MessageAttachment(data, 'card.png');
                        message.channel.send('Succesfully set your rank card to', attatchment);
                    });
                } finally {
                    mongoose.connection.close();
                }
            });
            return;
        }

        if (message.attachments.size === 0 && args[0]) {
            const { guild, member } = message;
            const guildId = guild.id;
            const userId = member.id;
            const userName = member.user.username;
            const imgurl = args[0];

            await mongo().then(async (mongoose) => {
                try {
                    console.log('Changed Backround image to ' + args[0]);
                    const result = await profileSchema.findOneAndUpdate(
                        {
                            guildId,
                            userId,
                            userName,
                        },
                        {
                            guildId,
                            userId,
                            userName,

                            bgimg: imgurl,
                        },
                        {
                            upsert: true,
                            new: true,
                        }
                    );
                    let { bgimg } = result;

                    bgimg = args[0];
                    await profileSchema.updateOne(
                        {
                            guildId,
                            userId,
                            userName,
                        },
                        {
                            bgimg,
                        }
                    );
                    const rank = new canvacord.Rank()
                        .setAvatar(message.author.displayAvatarURL({ dynamic: false, format: 'png' }))
                        .setUsername(message.author.username)
                        .setDiscriminator(message.author.discriminator)
                        .setBackground('IMAGE', bgimg);
                    rank.build().then((data) => {
                        const attatchment = new Discord.MessageAttachment(data, 'card.png');
                        message.channel.send('Succesfully set your rank card to', attatchment);
                    });
                } finally {
                    mongoose.connection.close();
                }
            });
        }
    },
};
