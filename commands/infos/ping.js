module.exports = {
    name: 'ping',
    aliases: [],
    category: 'Infos',
    permissions: [],
    utilisation: '{prefix}ping',

    execute(client, message) {
        message.channel.send(`Ping : \`${client.ws.ping}\` ms !`);
    },
};
