module.exports = {
    name: 'invite',
    aliases: [],
    category: 'infos',
    permissions: [],
    utilisation: '{prefix}invite',
    permission: 'everyone',

    execute(client, message) {
        message.channel.send('Hier die Discord invite\nhttps://discord.gg/29NEpHcn9u');
    },
};
