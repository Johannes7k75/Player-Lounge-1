module.exports = {
    name: 'emojiid',
    aliases: ['eid'],
    category: 'Infos',
    permissions: [],
    utilisation: '{prefix}emojiid',

    async execute(client, message, args) {
        const Discord = require('discord.js');
        message.delete()
        console.log(client.emojis.cache.get((emojis) => emojis.name === ':flag_gb:'));
        const embed = new Discord.MessageEmbed().setTitle('Emoji').setDescription('ID:');
        const embedmessage = await message.channel.send(embed);
        const filter = (reaction, user) => reaction.message.guild.id === '685176247726374961';
        embedmessage.awaitReactions(filter, { max: 1 }).then(
            (collected) => {
                console.log(collected.first()._emoji.name);
                if (collected.first()._emoji.id === (undefined || null)) {
                    embedmessage.edit({ embed: { title: `Emoji: ${collected.first()._emoji.name}`, description: `ID: \`${collected.first()._emoji.name}\`` } });
                } else {
                    embedmessage.edit({ embed: { title: `Emoji: ${collected.first()._emoji.name}`, description: `ID: \`${collected.first()._emoji.id}\`` } });
                }
                collected.delete({ timeout: 300000 })
            } // Getting the first reaction in the collection.
        )
    },
};
