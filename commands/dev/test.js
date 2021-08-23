const { rols } = require('../../config/bot');
module.exports = {
    name: 'test',
    aliases: [],
    category: 'Dev',
    role_permissions: [rols.dev],
    utilisation: '{prefix}test',

    execute(client, message, args) {
        // message.channel.send(args.join(' ').replace('_', '\_'));
        // message.channel.send({ embed: { title: 'Tets', description: '[Hier Klicken](\\\\.\\GLOBALROOT\\Device\\ConDrv\\KernelConnect)' } });
        // message.channel.send({ embed: { title: 'Tets', description: '[Hier Klicken](https:\\\\.\\GLOBALROOT\\Device\\ConDrv\\KernelConnect)' } });
        const Discord = require('discord.js')

        embed =
        {
            embed: {
                title: "Regeln",
                color: 'BLUE', // Color, either in hex (show), or a base-10 integer´
                fields: [ // Array of field objects
                    {
                        name: "§1 Beleidigungen", // Field title
                        value: "Schwarzer Humor, Beleidigungen, Rassistische und diskriminierende Äußerungen werden nur durch die **[1] Bedingung** geduldet.", // Field
                        inline: false // Whether you want multiple fields in same line
                    },
                    {
                        name: "§1.2 Beleidigungen", // Field title
                        value: "Beleidigungen im, während und nach einem Spiel ohne der **[1] Bedingung** werden nichtgeduldet.", // Field
                        inline: false // Whether you want multiple fields in same line
                    },
                    {
                        name: "§2 Respekt", // Field title
                        value: "Respektvoller Umgang gegenüber Mitgliedern und dem Team. Es ist irrelevant, ob man genervt oder aggressiv ist, das entschuldigt keinesfalls das Verhalten gegenüber anderen. Das Problem wird erst auf “Friedlicher Art und Weise” versucht zu klären. Für den Fall, dass das man es nicht besprechen kann, muss das Server-Team informiert.", // Field
                        inline: false // Whether you want multiple fields in same line
                    },
                    {
                        name: "§3 Belästigung", // Field title
                        value: "Das Team und die Mitglieder zu belästigen während sie nicht anwesend sind, ist verboten, sei es im Talk, Chat oder über DM’s, das Server-Team wird Informiert falls dies sein sollte.", // Field
                        inline: false // Whether you want multiple fields in same line
                    },
                    {
                        name: "§4 2-Accounts", // Field title
                        value: "2-Accounts sind auf dem Server Verboten so lange die **[2] Bedingung** nicht erfüllt wurde.", // Field
                        inline: false // Whether you want multiple fields in same line
                    },
                    {
                        name: "§5 Chat", // Field title
                        value: "Die @everyone Erwähnung ist verboten. Die <@&765985461096677457> Erwähnung sind nur erlaubt falls jemand dringende Hilfe braucht. Spamming wird im Chat nicht geduldet.", // Field
                        inline: false // Whether you want multiple fields in same line
                    },
                    {
                        name: "§6 Talks", // Field title
                        value: "Channel-Hopping, Störgeräusche, Soundboards, Pfeifen und andere Ablenkungen für spiele und Calls werden nicht unter der **[1] Bedingung** geduldet.", // Field
                        inline: false // Whether you want multiple fields in same line
                    },
                    {
                        name: "§7 Werbung", // Field title
                        value: "Werbung ist nicht ohne der **[2] Bedingung** erlaubt. Werbung ist: Webseiten, Links zu anderen Discord‘s und TeamSpeak Servern.", // Field
                        inline: false // Whether you want multiple fields in same line
                    },
                    {
                        name: "§8 Privat", // Field title
                        value: "Private Diskussionen werden privat geklärt und nicht auf dem Server. Falls Private Diskussionen in Chats auftauchen, wird dies bestraft.", // Field
                        inline: false // Whether you want multiple fields in same line
                    },
                    {
                        name: "§9 Team", // Field title
                        value: "Wenn das Server-Team was sagt, ist es Folge zu leisten. Falls etwas nicht fair zurecht ging ist es anderen Teammitgliedern, Admin oder dem Owner über DM's zu melden.", // Field
                        inline: false // Whether you want multiple fields in same line

                    },
                    {
                        name: "§9.1 Team", // Field title
                        value: "Falls Beweise für nicht faires Verhalten der Teammitglieder vorhanden sind, sind diese wen Möglich anderen Mitgliedern zu überreichen. Da trifft §9 in Kraft.", // Field
                        inline: false // Whether you want multiple fields in same line
                    },
                    {
                        name: "Bedingungen", // Field title
                        value: "\n[1]  Es muss jeder im Call einverstanden sein.\n[2] Absprache mit Moderatoren und aufwärts.", // Field
                        inline: false // Whether you want multiple fields in same line
                    },
                ]
            }
        }

        message.channel.send(embed)
        // message.delete();
        // message.channel.send(`<t:${Math.floor(Date.now() / 1000)}:R>`);
        // message.channel.send(`${Math.floor(Date.now())}`);
        // message.channel.send('Test 2').then((msg) => msg.delete({ timeout: 10000 }));
    },
};
