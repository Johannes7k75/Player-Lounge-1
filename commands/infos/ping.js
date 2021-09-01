module.exports = {
    name: 'ping',
    aliases: [],
    category: 'Infos',
    permissions: [],
    utilisation: '{prefix}ping',

    execute(client, message) {
        message.channel.send(`Ping : \`${client.ws.ping}\` ms !`);
        message.reply('Invalid command')

            .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);

    },
};
