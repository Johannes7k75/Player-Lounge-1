const fs = require('fs');
const cooldowns = new Map();

module.exports = (client, message, Discord) => {
    const discord = require('discord.js');
    const prefix = '!';
    const createChannelPrefix = 'cc!';
    if ((message.content.startsWith(createChannelPrefix) && !message.author.bot) || message.content === 'cc!ban') {
        const argscc = message.content.slice(createChannelPrefix.length).trim().split(/ +/g);
        const cmdcc = argscc.shift().toLowerCase();
        const commandcc = client.commands.find((c) => c.prefix === 'cc!' && c.name === cmdcc) || client.commands.find((a) => a.aliases && a.aliases.includes(cmdcc) && a.prefix === 'cc!');
        client.commands.map((x) => x.prefix && console.log(x.name));
        if (commandcc) {
            commandcc.execute(client, message, argscc, cmdcc);
            console.log(cmdcc);
            return;
        }
    }
    if (message.author.bot || message.channel.type === 'dm' || !message.content.startsWith(prefix) || message.content === prefix) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find((a) => a.aliases && a.aliases.includes(cmd));

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

    // Permissions system
    if (command.permissions) {
        if (command.permissions.length) {
            let invalidPerms = [];
            for (const perm of command.permissions) {
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
    }

    // Role permissions system with new role list
    if (command.rolePermissions) {
        if (command.rolePermissions.length) {
            const { owner, admin, moderator, dev, supporter, team, sklave, streamerLive, nitroBooster, vip, muted, dj, verifiziert } = client.config.role;
            const rolePermissions = [owner, admin, moderator, dev, supporter, team, sklave, streamerLive, nitroBooster, vip, muted, dj, verifiziert];
            let invalidRoles = [];
            for (const perm of command.rolePermissions) {
                if (!rolePermissions.includes(perm)) {
                    return console.log(`Invalid Roles: ${perm.name}`);
                }
                if (!message.member.roles.cache.has(perm.id)) {
                    invalidRoles.push(perm.name);
                }
            }
            if (invalidRoles.length) {
                return message.channel.send(`Missing Role: \`${invalidRoles.join(', ')}\``);
            }
        }
    }

    // Role permissions system with old role list
    if (command.role_permissions) {
        if (command.role_permissions.length) {
            const { owner, admin, moderator, dev, supporter, team, sklave, streamer_live, nitro_booster, vip, muted, dj, verifiziert } = client.config.rols;
            const role_permissions = [owner, admin, moderator, dev, supporter, team, sklave, streamer_live, nitro_booster, vip, muted, dj, verifiziert];
            let invalidPerms = [];
            for (const perm of command.role_permissions) {
                if (!role_permissions.includes(perm)) {
                    return console.log(`Invalid Roles: ${perm[1]}`);
                }
                if (!message.member.roles.cache.has(perm[0])) {
                    invalidPerms.push(perm[1]);
                }
            }
            if (invalidPerms.length) {
                return message.channel.send(`Missing Role: \`${invalidPerms.join(', ')}\` `);
            }
        }
    }

    // Cooldown manager
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new discord.Collection());
    }
    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = command.cooldown * 1000;

    if (time_stamps.has(message.author.id)) {
        const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

        if (current_time < expiration_time) {
            const time_left = (expiration_time - current_time) / 1000;
            return message.reply(`Please wait ${time_left.toFixed(1)} more seconds before using \`${command.name}\``);
        }
    }
    time_stamps.set(message.author.id, current_time);
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

    let teamRole = message.guild.roles.cache.find((r) => r.name === 'Team');
    // if (message.member.roles.cache.has(teamRole.id)) {
    if (command) command.execute(client, message, args, cmd, Discord);

    // Loging the who acces team commands
    var stream = fs.createWriteStream('./config/log.txt', { flags: 'a' });
    stream.write(`${message.author.username} [Author.ID ${message.author.id} | Server: ${message.guild.name}]: "${message.content}" ${new Date()}\n`);
};
