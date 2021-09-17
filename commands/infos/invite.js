const { role } = require('../../config/bot')
module.exports = {
    name: 'invite',
    aliases: [],
    category: 'Infos',
    rolePermissions: [role.dev],
    utilisation: '{prefix}invite',

    execute(client, message) {
        message.channel.send('Hier die Discord invite\nhttps://discord.gg/29NEpHcn9u');
    },
};
