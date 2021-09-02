module.exports = {
    name: 'todo',
    aliases: ['td'],
    category: 'Infos',
    permissions: [],
    utilisation: '{prefix}todo [priority 1 hightest, 4 lowest] [title, // for a space] [description]',

    execute(client, message, args) {
        const Discord = require('discord.js');
        message.delete();
        var prio;
        var prio_num;
        if (args[0] === '1') {
            prio = 'RED';
            prio_num = ':one:  ';
        }
        if (args[0] === '2') {
            prio = 'YELLOW';
            prio_num = ':two:  ';
        }
        if (args[0] === '3') {
            prio = 'GREEN';
            prio_num = ':three:  ';
        }
        if (args[0] === '4') {
            prio = 'GREY';
            prio_num = ':four:  ';
        }

        const description = args.slice(2).join(' ');
        const title = args[1].replace(/\/\//gm, ' ')
        const embed = new Discord.MessageEmbed()
            .setColor(prio)
            .setTitle(prio_num + title)
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: false, format: 'png' }))
            .setDescription('<@&844206736197550100>\n' + description)
            .setTimestamp();

        message.channel.send(embed).then((embedMessage) => {
            embedMessage.react('✅');
            embedMessage.react('🕒');
            embedMessage.react('❌');
            embedMessage.react('❔');
        });
    },
};
