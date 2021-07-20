module.exports = {
    name: 'warn',
    aliases: [],
    category: 'moderation',
    utilisation: '{prefix}warn [Mention] [Reason]',

    execute(client, message, args) {
        if (!args[0]) return;
        if (args.length === 0) return;
        if (message.mentions.users.size > 0) {
            user = message.mentions.users.first();
            reason = args.slice(1).join(' ');
            client.users.cache.get(user.id).send(`**${message.member.guild.name}:** You have been ⚠ Warned\n**Reason:** ${reason}`);
            client.channels.cache.get('733209511971651635').send({
                embed: {
                    author: {
                        name: message.author.username + '#' + message.author.discriminator + ` (ID ${message.author.id})`,
                        icon_url: message.author.displayAvatarURL({ dynamic: false, fomat: 'png' }),
                    },
                    description: '**⚠ Warned `' + user.username + '#' + user.discriminator + '`** ' + '*(ID ' + user.id + ')*' + `\n📄 **Reason:** ${reason}`,
                    color: '#FCA253',
                    thumbnail: {
                        url: user.displayAvatarURL({ dynamic: false, fomat: 'png' }),
                    },
                },
            });
        } else {
            return message.channel.send('Mention a user to use the command');
        }
        console.log(args[0]);
        args_len = args.length;
        console.log(args.length - 1);
    },
};

// bot.createMessage(msg.channel.id, {
//     embed: {
//         title: "title",
//         description: "description",
//             author: { // Author property
//             name: msg.author.username,
//                 icon_url: msg.author.avatarURL
//         },
//             color: #ffffff, // Color, either in hex (show), or a base-10 integer
//             fields: [ // Array of field objects
//                 {
//                     name: "name", // Field title
//                     value: "value", // Field
//                     inline: true // Whether you want multiple fields in same line
//             },
//         ],
//             footer: { // Footer text
//             text: "{7:text}"
//         }
//     }
// });

// {
// 	"author": {
// 		"name": "Johannes7k75#9801 (ID 587701169103699994)",
// 		"icon_url": "https://cdn.discordapp.com/avatars/587701169103699994/0b170a4567537818e85c208d4ea9f467.png"
// 	},
// 	"color": 16490576,
// 	"thumbnail": {
// 		"url": "https://cdn.discordapp.com/avatars/811946572300156998/2bbe073bbec7fb97503026ed69bf4636.png"
// 	},
// 	"description": "**⚠Warned Raspberry Watcher**#6213 *(ID 811946572300156998)*\n📄**Reason:** Test ([Logs](https://yagpdb.xyz/public/685176247726374961/log/11))"
// }
