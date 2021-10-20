const { role } = require('../../config/bot')
module.exports = {
    name: 'invite',
    aliases: [],
    category: 'Infos',
    rolePermissions: [role.team],
    utilisation: '{prefix}invite',

    execute(client, message) {
        message.channel.send('Hier der Discord invite\nhttps://discord.gg/29NEpHcn9u');
    },
};
