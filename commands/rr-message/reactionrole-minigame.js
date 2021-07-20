module.exports = {
    name: 'reactionrole-minigame',
    aliases: ['rr-minigame'],
    description: 'Embeds!',
    async execute(client, message, args) {
        const Discord = require('discord.js');
        const channel = client.config.discord.reactionchannel;
        const MiniGamesRole = message.guild.roles.cache.get('743858855313801316');

        const MiniGamesEmoji = '<:viedeogame:806948028795060299>';

        message.channel.bulkDelete(1);
        let embed = new Discord.MessageEmbed()
            .setColor('#D0021B')
            .setTitle('Mini Games')
            .setDescription('please choose whether you want to receive the Mini Games Channel\n\n' + `${MiniGamesEmoji} : Mini Games`);

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(MiniGamesEmoji);

        client.on('messageReactionAdd', async (reaction, user) => {
            console.log('Add');
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id === channel) {
                if (reaction.emoji.name === 'viedeogame') {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(MiniGamesRole);
                } else {
                    return;
                }
            }
        });

        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id === channel) {
                if (reaction.emoji.name === 'viedeogame') {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(MiniGamesRole);
                } else {
                    return;
                }
            }
        });
    },
};
