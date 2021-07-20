const fs = require('fs');
module.exports = (client, message, Discord) => {
    const prefix = client.config.discord.prefix;

    const args = message.content.slice(client.config.discord.prefix.length).trim().split(/ +/g);
    if (message.author.bot || message.channel.type === 'dm' || !message.content.startsWith(prefix) || message.content === client.config.discord.prefix) return;
    const commands = args.shift().toLowerCase();
    const cmds = client.commands.get(commands) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commands));
    let teamRole = message.guild.roles.cache.find((r) => r.name === 'Team');

    const validPermissions = [
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
    ];

    if (cmds.permissions.length) {
        let invalidPerms = [];
        for (const perm of cmds.permissions) {
            if (!validPermissions.includes(perm)) {
                return console.log(`Invalid Permissions: ${perm}`);
            }
            if (!message.member.hasPermission(perm)) {
                invalidPerms.push(perm);
            }
        }
        if (invalidPerms.length) {
            return message.channel.send(`Missing Permisssions: \`${invalidPerms}\` `);
        }
    }

    if (message.member.roles.cache.has(teamRole.id)) {
        if (cmds) cmds.execute(client, message, args, Discord);
        // Loging the who acces team commands
        var stream = fs.createWriteStream('./config/log.txt', { flags: 'a' });
        console.log('write stream');
        stream.write(message.author.username + '[' + 'Author.ID:' + message.author.id + '|' + 'Server:' + message.guild.name + ']' + ': ' + '"' + message.content + '"' + ' ' + new Date() + '\n');
    } else if (cmds.permission === 'everyone') {
        if (cmds) cmds.execute(client, message, args, Discord);
        return;
    }
};
