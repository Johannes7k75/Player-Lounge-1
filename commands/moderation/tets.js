const { rols } = require('../../config/bot');
module.exports = {
    name: 'test',
    aliases: [],
    category: 'moderation',
    role_permissions: [rols.dev],
    utilisation: '{prefix}test',

    execute(client, message, args) {
        // message.delete();
        // message.channel.send(`<t:${Math.floor(Date.now() / 1000)}:R>`);
        // message.channel.send(`${Math.floor(Date.now())}`);
        // message.channel.send('Test 2').then((msg) => msg.delete({ timeout: 10000 }));
    },
};
