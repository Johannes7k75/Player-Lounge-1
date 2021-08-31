module.exports = async (client, reaction, user, message) => {
    const Discord = require('discord.js');
    try {
        await reaction.fetch();
        await user.fetch();
    } catch (err) {
        console.log(err);
    }
    // For Todo only
    if (reaction.message.channel.id === '851173146530283570' && !user.bot) {
        // console.log(reaction.emoji.name);
        const reaction_name = reaction.emoji.name;

        var url;
        var status;
        if (!(reaction_name === '✅' || reaction_name === '🕒' || reaction_name === '❌' || reaction_name === '❔')) {
            return;
        }
        if (reaction_name === '✅') {
            url = 'https://images.emojiterra.com/twitter/v13.0/512px/2705.png'; reaction.message.embeds[0]
            status = 'ready';
            title_embed = reaction.message.embeds[0].title.split(' ')
            title_embed.splice(0, 1)
            client.channels.cache.get('832748810324541440').send({ embed: { description: `[To-do](${reaction.message.url}) wurde von  fertig gestellt\nTitle: ${title_embed.join('')}`, color: '#2ECC70', footer: { text: `gedrückt von ${user.username}#${user.discriminator}` } } });
        }
        if (reaction_name === '🕒') {
            url = 'https://images.emojiterra.com/twitter/v13.0/512px/1f552.png';
            status = 'in working';
        }
        if (reaction_name === '❌') {
            url = 'https://images.emojiterra.com/twitter/v13.0/512px/274c.png';
            status = 'delayed or impossible';
        }
        if (reaction_name === '❔') {
            url = 'https://images.emojiterra.com/twitter/v13.0/512px/2754.png';
            status = 'question/status';
            require('../../other/question')(client, user, message, reaction)
            // client.channels.cache.get('850776264457584650').send({ embed: { description: `<@&844206736197550100>\nBei [Nachricht](${reaction.message.url}) gibt es eine frage oder Status wird gefordert.\nUser: ${user.username}#${user.discriminator}\nID: ${user.id}` } });
        }

        const { title, description, color, timestamp, author } = reaction.message.embeds[0];

        // console.log(title);
        // console.log(description);
        // console.log(color);
        // console.log(timestamp);
        // console.log(author);
        let embed = new Discord.MessageEmbed().setFooter(status, url).setTitle(title).setDescription(description).setColor(color).setTimestamp(timestamp).setAuthor(author.name, author.iconURL);
        reaction.message.edit(embed);
        reaction.users.remove(user.id);
    } else {
        return;
    }
};
