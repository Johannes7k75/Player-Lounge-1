module.exports = {
    name: 'debug',
    aliases: [],
    category: 'Dev',
    permissions: [],
    utilisation: '{prefix}debug',

    execute(client, message) {
        message.channel.send(`${client.emotes.success} - ${client.user.username} connected in **${client.voice.connections.size}** channels !`);
    },
};