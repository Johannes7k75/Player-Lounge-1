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
            url = 'https://images.emojiterra.com/twitter/v13.0/512px/2705.png';
            status = 'ready';
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
            status = 'question';
        }

        const { title, description, color, timestamp, author } = reaction.message.embeds[0];

        // console.log(title);
        // console.log(description);
        // console.log(color);
        // console.log(timestamp);
        // console.log(author);
        let embed = new Discord.MessageEmbed().setFooter(status, url).setTitle(title).setDescription(description).setColor(color).setTimestamp(timestamp).setAuthor(author.name, author.iconURL);
        reaction.message.edit(embed);
    } else {
        return;
    }
};
