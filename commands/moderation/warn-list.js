const mongo = require('../../other/mongo_local');
const logSchema = require('../../schemas/log-schema');
const Discord = require('discord.js');
module.exports = {
    name: 'warn-list',
    aliases: [],
    category: 'moderation',
    permissions: [],
    utilisation: '{prefix}warn-list',

    async execute(client, message, args) {
        if (args <= 0) {
        }
        // const Util = require('../../node_modules/canvacord/plugins/Util');
        const Util = require('../../node_modules/canvacord/plugins/Util');
        const guildId = message.guild.id;
        await mongo().then(async (mongoose) => {
            try {
                console.log('Connected To Mongo Local');
                const result = await logSchema
                    .find({
                        guildId,
                    })
                    .sort([['userName', 'asc']])
                    .exec();

                let embed = new Discord.MessageEmbed().setTitle('Warn List');

                //if there are no results
                if (result.length === 0) {
                    return console.log('No results');
                } else if (result.length < 10) {
                    //less than 10 results
                    for (i = 0; i < result.length; i++) {
                        if (result[i].warnings.length > 0) {
                            let member = message.guild.members.cache.get(result[i].userId) || 'User Left';
                            // for (a = 0; a < result[i].warnings.length; a++) {
                            // console.log(`warning ${a}:`, result[i].warnings[a]);
                            if (member === 'User Left') {
                                embed.addFields({ name: `${Util.shorten(result[i].userName, 20)}, Warnings: ${result[i].warnings.length}`, value: `last reason: ${result[i].warnings[result[i].warnings.length - 1].reason}\nlast date: <t:${result[i].warnings[result[i].warnings.length - 1].date}:R>` });
                            } else {
                                embed.addFields({ name: `${Util.shorten(result[i].userName, 20)}, Warnings: ${result[i].warnings.length}`, value: `last reason: ${result[i].warnings[result[i].warnings.length - 1].reason}\nlast date: <t:${result[i].warnings[result[i].warnings.length - 1].date}:R>` });
                            }
                            // }
                        }
                    }
                    message.channel.send(embed);
                } else {
                }
            } finally {
                mongoose.connection.close();
            }
        });
    },
};
