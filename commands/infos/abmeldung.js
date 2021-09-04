module.exports = {
    name: 'abmeldung',
    aliases: ['urlaub'],
    category: 'Infos',
    permissions: [],
    description: 'Ein Team Command zum Abmelden',
    utilisation: '{prefix}abmeldung [date example: 18.8.2021-19.9.2021] [Reason]',

    execute(client, message, args) {
        var unixdate = args[0].split('-')
        var date = args[0]
        var reason = args.slice(1).join(' ')

        unixdate = unixdate[1].split('.')
        // 11.8.2021
        unixdate = new Date(unixdate[2], unixdate[1] - 1, unixdate[0]).getTime()

        message.delete()
        message.channel.send({ embed: { title: `Abmeldung`, description: `**${message.author.username}#${message.author.discriminator}** Meldet sich vom **${date}** ab.\nGrund: **${reason}**\n\nAlso bis <t:${unixdate / 1000}:R>! :wave:` } })
    },
};