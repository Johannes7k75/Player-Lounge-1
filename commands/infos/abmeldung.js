module.exports = {
    name: 'abmeldung',
    aliases: ['urlaub'],
    category: 'Infos',
    permissions: [],
    description: 'Ein Team Command zum Abmelden',
    utilisation: '{prefix}abmeldung [date example: 18.8.2021-19.9.2021] [Reason]',

    execute(client, message, args) {
        console.log(args)
        var reason = args[1]
        var unixdate = args[0].split('-')
        unixdate = unixdate[1].split('.')
        // 11.8.2021
        unixdate = new Date(unixdate[2], unixdate[1] - 1, unixdate[0]).getTime()
        console.log(args[0], reason)
        message.delete()
        message.channel.send({ embed: { title: `Abmeldung`, description: `**${message.author.username}#${message.author.discriminator}** Meldet sich vom **${args[0]}** ab.\nGrund: **${reason}**\n\nAlso bis <t:${unixdate / 1000}:R>! :wave:` } })
    },
};