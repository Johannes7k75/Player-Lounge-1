module.exports = {
    name: 'regeln',
    aliases: [],
    category: '/Infos',
    permissions: [],
    utilisation: '{prefix}regeln',

    async execute(client, message, args) {

        //     if (args[0]) args[0].toLowerCase();
        //     if (args[1]) args[1].toLowerCase();

        //     const data_file = require('../../other/data')
        //     const fs = require('fs')
        //     const Discord = require('discord.js')

        //     // Liste all regeln auf: team, all 
        //     if (!args[0]) {
        //         var embed = new Discord.MessageEmbed().setTitle('Regeln').setFooter('Wenn nicht mehr benötigt bitte 🗑️ klicken');
        //         embed.addFields({ name: 'Team Regeln', value: `Deutsche Regeln: \`${data_file.regeln.team.length}\`` }, { name: 'Allgemeine Regeln', value: `Deutsche Regeln: \`${data_file.regeln.all.de.length}\`\nEnglische Regeln: \`${data_file.regeln.all.en.length}\`` })
        //         const filter = (reaction, user) => reaction.emoji.name === '🗑️' && user.bot != true; //;
        //         const embedmessage = await message.channel.send(embed);

        //         embedmessage.react('🗑️');
        //         embedmessage.awaitReactions(filter, { max: 1 }).then((collected) => collected.first().message.delete());
        //     }

        //     if (args[0] === 'team') {
        //         if (!args[1]) {
        //             var embed = new Discord.MessageEmbed().setTitle('Ream Regeln').setFooter('Wenn nicht mehr benötigt bitte 🗑️ klicken');
        //             description = []
        //             for (i = 0; i < data_file.regeln.team.length; i++) {
        //                 description.push(`${i + 1}. <${data_file.regeln.team[i].title}>\n${data_file.regeln.team[i].content}`)
        //             }
        //             embed.setDescription(`\`\`\`html\n${description.join('\n\n')}\`\`\``)
        //             const embedmessage = await message.channel.send(embed);
        //             const filter = (reaction, user) => reaction.emoji.name === '🗑️' && user.bot != true; //;

        //             embedmessage.react('🗑️');
        //             embedmessage.awaitReactions(filter, { max: 1 }).then((collected) => collected.first().message.delete());
        //         } else if (args[1] === 'add') {
        //             const title = args[2].replace(/\/\//gm, ' ')
        //             const content = args.slice(3).join(' ')

        //             data_file.regeln.team.push({ title: title, content: content })
        //             var stream = fs.createWriteStream(`other/data.js`, { flags: 'w' });
        //             stream.write(`module.exports = ` + JSON.stringify(data_file, null, '\t'));
        //             message.channel.send(`Added rule \`${title}\``).then((msg) => msg.delete({ timeout: 30000 }))
        //         } else if (args[1] === 'remove') {
        //             const index = data_file.regeln.team.indexOf(data_file.regeln.team[args[2] - 1]);
        //             if (index > -1) {
        //                 const rule_name = data_file.regeln.team[args[2] - 1].title;
        //                 data_file.regeln.team.splice(index, 1);
        //                 var stream = fs.createWriteStream(`other/data.js`, { flags: 'w' });
        //                 stream.write(`module.exports = ` + JSON.stringify(data_file, null, '\t'));
        //                 message.channel.send(`Removed rule \`${index + 1}\``).then((msg) => msg.delete({ timeout: 30000 }))
        //             } else {
        //                 message.channel.send(`No Rule found with that numnber \`${args[2]}\` `).then((msg) => msg.delete({ timeout: 30000 }));
        //             }

        //         }
        //     }
        //     if (args[0] === 'all') {
        //         if (!args[1]) {
        //             var embed = new Discord.MessageEmbed().setTitle('Allgemeine Regeln').setFooter('Wenn nicht mehr benötigt bitte 🗑️ klicken')
        //             embed.addFields({ name: 'Deutsche Regeln', value: `\`${data_file.regeln.all.de.length}\`` }, { name: 'Englische Regeln', value: `\`${data_file.regeln.all.en.length}\`` })
        //         } else if (args[1] === 'de') {
        //             if (!args[2]) {
        //                 var embed = new Discord.MessageEmbed().setTitle('Allgemeine Regeln Deutsch').setFooter('Wenn nicht mehr benötigt bitte 🗑️ klicken')
        //                 description = []
        //                 for (i = 0; i < data_file.regeln.all.de.length; i++) {
        //                     description.push(`${i + 1}. <${data_file.regeln.all.de[i].title}>\n${data_file.regeln.all.de[i].conetnt}`)
        //                 }
        //                 embed.setDescription(`\`\`\`html\n${description.join('\n\n')}\`\`\``)
        //                 const embedmessage = await message.channel.send(embed);
        //                 const filter = (reaction, user) => reaction.emoji.name === '🗑️' && user.bot != true;
        //                 embedmessage.react('🗑️');
        //                 embedmessage.awaitReactions(filter, { max: 1 }).then((collected) => collected.first().message.delete());
        //             } else if (args[2] === 'add') {
        //                 const title = args[3].replace(/\/\//gm, ' ')
        //                 const conetnt = args.slice(4).join(' ')

        //                 data_file.regeln.all.de.push({ title: title, conetnt: conetnt })
        //                 var stream = fs.createWriteStream(`other/data.js`, { flags: 'w' });
        //                 stream.write(`module.exports = ` + JSON.stringify(data_file, null, '\t'));
        //                 message.channel.send(`Added :flag_de: rule\`${title}\``).then((msg) => msg.delete({ timeout: 30000 }))
        //             } else if (args[2] === 'remove') {
        //                 const index = data_file.regeln.all.de.indexOf(data_file.regeln.team.de[args[3] - 1]);
        //                 if (index > -1) {
        //                     const rule_name = data_file.regeln.all.de[args[3] - 1].title;
        //                     data_file.regeln.all.de.splice(index, 1);
        //                     var stream = fs.createWriteStream(`other/data.js`, { flags: 'w' });
        //                     stream.write(`module.exports = ` + JSON.stringify(data_file, null, '\t'));
        //                     message.channel.send(`Removed rule :flag_de: \`${index + 1}\``).then((msg) => msg.delete({ timeout: 30000 }))
        //                 } else {
        //                     message.channel.send(`No Rule found with that numnber \`${args[2]}\` `).then((msg) => msg.delete({ timeout: 30000 }));
        //                 }
        //             }

        //         } else if (args[1] === 'en') {
        //             if (!args[2]) {
        //                 var embed = new Discord.MessageEmbed().setTitle('Allgemeine Regeln').setFooter('Wenn nicht mehr benötigt bitte 🗑️ klicken')
        //                 description = []
        //                 for (i = 0; i < data_file.regeln.all.en.length; i++) {
        //                     description.push(`${i + 1}. <${data_file.regeln.all.en[i].title}>\n${data_file.regeln.all.en[i].conetnt}`)
        //                 }
        //                 embed.setDescription(`\`\`\`html\n${description.join('\n\n')}\`\`\``)
        //                 const embedmessage = await message.channel.send(embed);
        //                 const filter = (reaction, user) => reaction.emoji.name === '🗑️' && user.bot != true;
        //                 embedmessage.react('🗑️');
        //                 embedmessage.awaitReactions(filter, { max: 1 }).then((collected) => collected.first().message.delete());
        //             } else if (args[2] === 'add') {
        //                 const title = args[3].replace(/\/\//gm, ' ')
        //                 const conetnt = args.slice(4).join(' ')

        //                 data_file.regeln.all.en.push({ title: title, conetnt: conetnt })
        //                 var stream = fs.createWriteStream(`other/data.js`, { flags: 'w' });
        //                 stream.write(`module.exports = ` + JSON.stringify(data_file, null, '\t'));
        //                 message.channel.send(`Added :flag_gb: rule\`${title}\``).then((msg) => msg.delete({ timeout: 30000 }))
        //             } else if (args[2] === 'remove') {
        //                 const index = data_file.regeln.all.en.indexOf(data_file.regeln.team.de[args[3] - 1]);
        //                 if (index > -1) {
        //                     const rule_name = data_file.regeln.all.en[args[3] - 1].title;
        //                     data_file.regeln.all.en.splice(index, 1);
        //                     var stream = fs.createWriteStream(`other/data.js`, { flags: 'w' });
        //                     stream.write(`module.exports = ` + JSON.stringify(data_file, null, '\t'));
        //                     message.channel.send(`Removed rule :flag_gb: \`${index + 1}\``).then((msg) => msg.delete({ timeout: 30000 }))
        //                 } else {
        //                     message.channel.send(`No Rule found with that numnber \`${args[2]}\` `).then((msg) => msg.delete({ timeout: 30000 }));
        //                 }
        //             }
        //         }
        //     }
    },
};