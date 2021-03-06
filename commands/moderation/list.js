const { rols } = require('../../config/bot');
module.exports = {
    name: 'list',
    aliases: [],
    category: 'Moderation',
    permissions: [],
    role_permissions: [rols.team],
    utilisation: '{prefix}list',

    async execute(client, message, args) {
        const Discord = require('discord.js');
        const fs = require('fs');
        const list_file = require('../../other/lists');
        const { list } = require('../../config/command');

        message.delete({ timeout: list.countdown });

        // Command Feedback function
        function cmdFeedback(cmd, listname, fieldname) {
            if (list.commandFeedback === true) {
                if (cmd === 'roleadd') {
                    message.channel.send(`Added Role \`${fieldname}\` to \`${listname}\``).then((msg) => msg.delete({ timeout: list.countdown }));
                }
                if (cmd === 'roleremove') {
                    message.channel.send(`Removed from list \`${listname}\` the role \`${fieldname}\``).then((msg) => msg.delete({ timeout: list.countdown }));
                }
                if (cmd === 'add') {
                    message.channel.send(`Added field \`${fieldname}\` to \`${listname}\``).then((msg) => msg.delete({ timeout: list.countdown }));
                }
                if (cmd === 'remove') {
                    message.channel.send(`Removed from list \`${listname}\` the field with \`${fieldname}\` as conetnt`).then((msg) => msg.delete({ timeout: list.countdown }));
                }
                if (cmd === 'delete') {
                    message.channel.send(`Deleted list \`${listname}\``).then((msg) => msg.delete({ timeout: list.countdown }));
                }
                if (cmd === 'create') {
                    message.channel.send(`Created list \`${listname}\``).then((msg) => msg.delete({ timeout: list.countdown }));
                }
            } else if (list.commandFeedback === false) {
                return;
            }
        }

        const rankRols = [
            rols.owner,
            rols.admin,
            rols.moderator,
            rols.supporter,
            rols.dev
            // cosupporter: rols.cosupporter,
        ];

        // List all lists
        if (!args[0]) {
            if (!message.member.roles.cache.has(rols.team[0])) {
                return;
            }
            var embed = new Discord.MessageEmbed().setTitle('Lists');
            var Eintr??geLen;
            for (i = 0; i < list_file.lists.length; i++) {
                if (list_file.lists[i].fields === undefined) {
                    Eintr??geLen = 0;
                } else {
                    Eintr??geLen = list_file.lists[i].fields.length;
                }
                embed.addFields({ name: `${i + 1}. ${list_file.lists[i].name}`, value: `Eintr??ge: \`${Eintr??geLen}\`` }).setFooter('Wenn nicht mehr ben??tigt bitte ??????? klicken');
            }
            const filter = (reaction, user) => reaction.emoji.name === '???????' && user.bot != true; //;
            const embedmessage = await message.channel.send(embed).then((msg) => msg.delete({ timeout: list.countdown }));
            embedmessage.react('???????');
            embedmessage.awaitReactions(filter, { max: 1 }).then((collected) => collected.first().message.delete());
            return;
        } else if (args[0] && !args[1]) {
            if (!message.member.roles.cache.has(rols.team[0])) {
                return;
            }
            var embed = new Discord.MessageEmbed().setTitle(`${list_file.lists[args[0] - 1].name}`);
            description = [];
            for (i = 0; i < list_file.lists[args[0] - 1].fields.length; i++) {
                description.push(`${i + 1}. ${list_file.lists[args[0] - 1].fields[i]}`);
            }
            embed.setDescription(`\`\`\`${description.join('\n')}\`\`\``).setFooter('Wenn nicht mehr ben??tigt bitte ??????? klicken');
            const filter = (reaction, user) => reaction.emoji.name === '???????' && user.bot != true; //;

            embedmessage = await message.channel.send(embed).then((msg) => msg.delete({ timeout: list.countdown }));
            embedmessage.react('???????');
            embedmessage.awaitReactions(filter, { max: 1 }).then((collected) => collected.first().message.delete());

            return;
        }

        if (args[1] === 'rols' || args[1] === 'roles') {
            if (!args[2]) {
                const list = list_file.lists[args[0] - 1]
                var embed = new Discord.MessageEmbed().setTitle(`${list.name}`)
                description = []
                for (i = 0; i < list.rols.length; i++) {
                    description.push(`\`${list.rols[i].name}\``)
                }
                embed.setDescription(`${description.join(', ')}`).setFooter('Wenn nicht mehr ben??tigt bitte ??????? klicken')
                const filter = (reaction, user) => reaction.emoji.name === '???????' && user.bot != true; //;

                embedmessage = await message.channel.send(embed).then((msg) => msg.delete({ timeout: list.countdown }));
                embedmessage.react('???????');
                embedmessage.awaitReactions(filter, { max: 1 }).then((collected) => collected.first().message.delete());

            } else if (args[2] === 'add') {
                const rolearr = list_file.lists[args[0] - 1].rols
                var getAllMentions = message.mentions.roles.first(message.mentions.roles.size)
                let roleName
                for (i = 0; i < message.mentions.roles.size; i++) {
                    for (a = 0; a < rankRols.length; a++) {
                        if (rankRols[a][0] === getAllMentions[i].id) {
                            roleName = rankRols[a][1]
                        }
                    }
                    rolearr.push({ name: roleName, id: getAllMentions[i].id })
                    cmdFeedback('roleadd', list_file.lists[args[0] - 1].name, roleName);
                }
                var stream = fs.createWriteStream(`other/lists.js`, { flags: 'w' });
                stream.write(`module.exports = ` + JSON.stringify(list_file, null, '\t'));



            } else if (args[2] === 'remove') {
                const rolearr = list_file.lists[args[0] - 1].rols
                var getAllMentions = message.mentions.roles.first(message.mentions.roles.size)
                let roleName
                for (i = 0; i < rolearr.length; i++) {
                    for (a = 0; a < message.mentions.roles.size; a++) {
                        if (rolearr[i].id === getAllMentions[a].id) {
                            roleName = list_file.lists[args[0] - 1].rols[i].name
                            list_file.lists[args[0] - 1].rols.splice(i, 1)
                            cmdFeedback('roleremove', list_file.lists[args[0] - 1].name, roleName);
                        }
                    }
                }
                var stream = fs.createWriteStream(`other/lists.js`, { flags: 'w' });
                stream.write(`module.exports = ` + JSON.stringify(list_file, null, '\t'));
            }
        }
        // Add a field to a list
        if (args[1] === 'add') {
            if (!message.member.roles.cache.some((r) => [rols.supporter[0], rols.moderator[0], rols.admin[0], rols.owner[0]].includes(r.id))) {
                message.channel.send(`You don't have the role: \`Supporter\` or higher`).then((msg) => msg.delete({ timeout: list.countdown }));
                return;
            }
            list_file.lists[args[0] - 1].fields.push(args.slice(2).join(' '));
            var stream = fs.createWriteStream(`other/lists.js`, { flags: 'w' });
            stream.write(`module.exports = ` + JSON.stringify(list_file, null, '\t'));
            cmdFeedback('add', list_file.lists[args[0] - 1].name, args.slice(2).join(' '));
            // message.channel.send(`Added field \`${args.slice(2).join(' ')}\` to \`${list_file.lists[args[0] - 1].name}\``);
            return;
        }
        // Remove a field from a list
        if (args[1] === 'remove') {
            if (!message.member.roles.cache.some((r) => [rols.supporter[0], rols.moderator[0], rols.admin[0], rols.owner[0]].includes(r.id))) {
                message.channel.send(`You don't have the role: \`Supporter\` or higher`).then((msg) => msg.delete({ timeout: list.countdown }));
                return;
            }
            const index = list_file.lists[args[0] - 1].fields.indexOf(list_file.lists[args[0] - 1].fields[args[2] - 1]);
            if (index > -1) {
                const field_name = list_file.lists[args[0] - 1].fields[args[2] - 1];
                const list_name = list_file.lists[args[0] - 1].name;
                list_file.lists[args[0] - 1].fields.splice(index, 1);
                var stream = fs.createWriteStream(`other/lists.js`, { flags: 'w' });
                stream.write(`module.exports = ` + JSON.stringify(list_file, null, '\t'));
                cmdFeedback('remove', list_name, field_name);
            }
        }
        // Delete a list
        if (args[1] === 'delete') {
            if (!message.member.roles.cache.some((r) => [rols.moderator[0], rols.admin[0], rols.owner[0]].includes(r.id))) {
                message.channel.send(`You don't have the role: \`Moderator\` or higher`).then((msg) => msg.delete({ timeout: list.countdown }));
                return;
            }
            const index = list_file.lists.indexOf(list_file.lists[args[0] - 1]);
            if (index > -1) {
                const list_name = list_file.lists[args[0] - 1].name;
                list_file.lists.splice(index, 1);
                var stream = fs.createWriteStream(`other/lists.js`, { flags: 'w' });
                stream.write(`module.exports = ` + JSON.stringify(list_file, null, '\t'));
                cmdFeedback('delete', list_name);
            } else {
                message.channel.send(`No list found with that numnber \`${args[0]}\` `);
            }
            return;
        }
        // Create a list
        if (args[0] === 'create') {
            if (!message.member.roles.cache.some((r) => [rols.moderator[0], rols.admin[0], rols.owner[0]].includes(r.id))) {
                message.channel.send(`You don't have the role: \`Moderator\` or higher`).then((msg) => msg.delete({ timeout: list.countdown }));
                return;
            }
            list_file.lists.push({ name: args.slice(1).join(' '), fields: [], rols: [] });
            var stream = fs.createWriteStream(`other/lists.js`, { flags: 'w' });
            stream.write(`module.exports = ` + JSON.stringify(list_file, null, '\t'));
            cmdFeedback('create', args.slice(1).join(' '));
            return;
        }
    },
};
