module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'Core',
    permissions: [],
    utilisation: '{prefix}help <command name>',

    execute(client, message, args) {
        if (!args[0]) {
            const infos = message.client.commands
                .filter((x) => x.category == 'Infos')
                .map((x) => '`' + x.name + '`')
                .join(', ');
            const lvlsystem = message.client.commands
                .filter((x) => x.category == 'levelsystem')
                .map((x) => '`' + x.name + '`')
                .join(', ');
            const moderation = message.client.commands
                .filter((x) => x.category == 'moderation')
                .map((x) => '`' + x.name + '`')
                .join(', ');

            message.channel.send({
                embed: {
                    color: 'ORANGE',
                    author: { name: 'Help pannel' },
                    fields: [
                        { name: 'Bot', value: infos },
                        { name: 'Levelsystem', value: lvlsystem },
                        { name: 'Moderation', value: moderation },
                    ],
                    timestamp: new Date(),
                },
            });
        } else {
            const command = message.client.commands.get(args.join(' ').toLowerCase()) || message.client.commands.find((x) => x.aliases && x.aliases.includes(args.join(' ').toLowerCase()));
            if (!command) return message.channel.send(`${client.emotes.error} - I did not find this command !`);
            if (message.member.hasPermission('VIEW_AUDIT_LOG')) {
                message.channel.send({
                    embed: {
                        color: 'ORANGE',
                        author: { name: 'Help pannel' },
                        fields: [
                            { name: 'Name', value: command.name, inline: true },
                            { name: 'Category', value: command.category, inline: true },
                            { name: 'Aliase(s)', value: command.aliases.length < 1 ? 'None' : command.aliases.join(', '), inline: true },
                            { name: 'Utilisation', value: command.utilisation.replace('{prefix}', client.config.discord.prefix), inline: true },
                            { name: 'Permissions', value: command.permissions.length < 1 ? 'None' : command.permissions.join(', '), inline: true },
                        ],
                        timestamp: new Date(),
                        description: 'Find information on the command provided.\nMandatory arguments `[]`, optional arguments `<>`.',
                    },
                });
            } else {
                message.channel.send({
                    embed: {
                        color: 'ORANGE',
                        author: { name: 'Help pannel' },
                        fields: [
                            { name: 'Name', value: command.name, inline: true },
                            { name: 'Category', value: command.category, inline: true },
                            { name: 'Aliase(s)', value: command.aliases.length < 1 ? 'None' : command.aliases.join(', '), inline: true },
                            { name: 'Utilisation', value: command.utilisation.replace('{prefix}', client.config.discord.prefix), inline: true },
                        ],
                        timestamp: new Date(),
                        description: 'Find information on the command provided.\nMandatory arguments `[]`, optional arguments `<>`.',
                    },
                });
            }
        }
    },
};
