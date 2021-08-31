module.exports = async function (client, user, message, reaction) {
    client.users.cache.get(user.id).send('Du hast **5 minuten Zeit** eine Frag zu schreiben, die an die **Developer** gesendet wird!\nWenn du nicht Antwortest wird es als eine Statusanfrage anerkannt.').then(() => {
        const filter = response => response.author.bot === false // 360000
        client.users.cache.get(user.id).dmChannel.awaitMessages(filter, { max: 1, time: 360000, errors: ['time'] }).then(collected => {
            client.channels.cache.get('850776264457584650').send({ embed: { description: `<@&844206736197550100>\nDer User: **${collected.first().author.username}#${collected.first().author.discriminator}**,\nHat eine Frage zur To-Do **[${reaction.message.embeds[0].title.split(' ')[2]}](${reaction.message.url})**:\n\`${collected.first().content}\`` } })
        }).catch(collected => {
            client.users.cache.get(user.id).dmChannel.lastMessage.delete()
            client.channels.cache.get('850776264457584650').send({ embed: { description: `<@&844206736197550100>\nBei [Nachricht](${reaction.message.url}) gibt es eine frage oder Status wird gefordert.\nUser: ${user.username}#${user.discriminator}\nID: ${user.id}` } })
        })
    })
}