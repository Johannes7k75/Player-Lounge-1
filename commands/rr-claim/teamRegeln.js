module.exports = async (client) => {
    const Discord = require('discord.js')
    const regelChat = '875837401564594236'
    const channel = await client.channels.fetch(regelChat);


    let teamRegeln = [
        {
            title: '[Object]',
            value: '[Object, Object]'
        }
    ]

    let embed = new Discord.MessageEmbed().setTitle('Team Regeln').setColor('#3498DB')

    for (i = 0; i < teamRegeln.length; i++) {
        value = teamRegeln[i].value.replace('[1] Bedingung', '**[1] Bedingung**')
        value = value.replace('[2] Bedingung', '**[2] Bedingung**')

        embed.addFields({ name: teamRegeln[i].title, value: value, inline: false })
    }
    channel.messages.fetch().then((messages) => {
        if (messages.size === 0) {
            // Send a new message
            channel.send(embed)
        } else {
            // Edit the existing message
            for (const message of messages) {
                message[1].edit(embed);
            }
        }
    });

};

