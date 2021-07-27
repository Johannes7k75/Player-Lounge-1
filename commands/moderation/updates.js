module.exports = {
    name: 'updates',
    aliases: ['up'],
    category: 'moderation',
    permissions: [],
    utilisation: '{prefix}updates [de/en]',

    execute(client, message, args) {
        if (!args[2]) return message.channel.send(`Please enter the content after the title.`).then((msg) => msg.delete({ timeout: 10000 }));
        if (message.channel.id === '743525218693414992') {
            message.delete();
        }
        if (args[0].toLowerCase() === 'de') {
            console.log(args);
            let title = args[1].replace(/\/space/gm, ' ');
            args.splice(0, 2);
            message.channel.send({
                embed: {
                    fields: {
                        name: title,
                        value: `:flag_de: <@&765985461096677457>\n ${args.join(' ')} :flag_de:`,
                    },
                },
            });
        } else if (args[0].toLowerCase() === 'en') {
            console.log(args);
            let title = args[1].replace(/\/space/gm, ' ');
            args.splice(0, 2);
            message.channel.send({
                embed: {
                    fields: {
                        name: title,
                        value: `:flag_gb: <@&765985461096677457>\n ${args.join(' ')} :flag_gb:`,
                    },
                },
            });
        }
    },
};
