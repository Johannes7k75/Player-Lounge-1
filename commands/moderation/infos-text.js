const Discord = require('discord.js');
module.exports = {
    name: 'infos-text',
    aliases: [],
    category: 'moderation',
    utilisation: '{prefix}infos',

    execute(client, message) {
        message.delete();
        message.channel.send(`${client.config.discord.invite_link}\nEinladungscode: ${client.config.discord.invite_code}`);

        embed = new Discord.MessageEmbed().setTitle('Webseite').setColor('RANDOM').setDescription(`Unsere kleine Webseite <${client.config.discord.website}>`);

        message.channel.send(embed);
    },
};
