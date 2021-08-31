const rrclaim = require('./claim');
const updateMembers = require('../../counters/member-counter');

module.exports = (client) => {
    const Discord = require('discord.js')
    const channelId = '747870506262462474';

    const getEmoji = (emojiName) => client.emojis.cache.find((emoji) => emoji.name === emojiName);

    const emojis = {
        creditcard: '💳Verifiziert💳',
    };

    const reactions = [];




    let embed = new Discord.MessageEmbed().setTitle('Regeln').setDescription('Bestätige mit :credit_card: das du die Regeln gelesen hast, um andere Känele zu sehen.')

    let Regeln = [
        {
            title: '§1 Beleidigungen',
            value: 'Schwarzer Humor, Beleidigungen, Rassistische und diskriminierende Äußerungen werden nur durch die [1] Bedingung geduldet.'
        },
        {
            title: '§1.2 Beleidigungen',
            value: 'Beleidigungen im, während und nach einem Spiel ohne der [1] Bedingung werden nichtgeduldet.'
        },
        {
            title: '§2 Respekt',
            value: 'Respektvoller Umgang gegenüber Mitgliedern und dem Team. Es ist irrelevant, ob man genervt oder aggressiv ist, das entschuldigt keinesfalls das Verhalten gegenüber anderen. Das Problem wird erst auf “Friedlicher Art und Weise” versucht zu klären. Für den Fall, dass das man es nicht besprechen kann, muss das Server-Team informiert.'
        },
        {
            title: '§3 Belästigung',
            value: 'Das Team und die Mitglieder zu belästigen während sie nicht anwesend sind, ist verboten, sei es im Talk, Chat oder über DM’s, das Server-Team wird Informiert falls dies sein sollte.'
        },
        {
            title: '§4 2-Accounts',
            value: '2-Accounts sind auf dem Server Verboten so lange die [2] Bedingung nicht erfüllt wurde.'
        },
        {
            title: '§5 Chat ',
            value: 'Die @everyone Erwähnung ist verboten. Die <@&765985461096677457> Erwähnung sind nur erlaubt falls jemand dringende Hilfe braucht. Spamming wird im Chat nicht geduldet.'
        },
        {
            title: '§6 Talks',
            value: 'Channel-Hopping, Störgeräusche, Soundboards, Pfeifen und andere Ablenkungen für spiele und Calls werden nicht unter der [1] Bedingung geduldet.'
        },
        {
            title: '§7 Werbung',
            value: 'Werbung ist nicht ohne der [2] Bedingung erlaubt. Werbung ist: Webseiten, Links zu anderen Discord‘s und TeamSpeak Servern.'
        },
        {
            title: '§8 Privat',
            value: 'Private Diskussionen werden privat geklärt und nicht auf dem Server. Falls Private Diskussionen in Chats auftauchen, wird dies bestraft.'
        },
        {
            title: '§9 Team',
            value: 'Wenn das Server-Team was sagt, ist es Folge zu leisten. Falls etwas nicht fair zurecht ging ist es anderen Teammitgliedern, Admin oder dem Owner über DM\'s zu melden.'
        },
        {
            title: '§ 9.1 Team',
            value: 'Falls Beweise für nicht faires Verhalten der Teammitglieder vorhanden sind, sind diese wen Möglich anderen Mitgliedern zu überreichen. Da trifft §9 in Kraft.'
        },
        {
            title: '§10 Commands',
            value: 'Commands düfen nicht gespammt oder ausgenutzt werden. Bei Fehlern von commands wird dies dem Server-Team gemeldet.'
        },
        {
            title: '§11 Nickname',
            value: 'Es dürfen keine Sonderzeichen benutzt werden beim Nickname außer es handelt sich um die [2] Bedingung',
        },
        {
            title: 'Bedingungen',
            value: '[1] Es muss jeder im Call einverstanden sein.\n[2] Absprache mit Moderatoren und aufwärts.'
        }
    ]

    for (i = 0; i < Regeln.length; i++) {
        value = Regeln[i].value.replace('[1] Bedingung', '**[1] Bedingung**')
        value = value.replace('[2] Bedingung', '**[2] Bedingung**')
        embed.addFields({ name: Regeln[i].title, value: value })
    }

    for (const key in emojis) {
        const emoji = getEmoji(key);
        reactions.push(emoji);
    }

    rrclaim(client, channelId, embed, reactions);

    const handleReaction = (reaction, user, add) => {
        if (user.bot) {
            return;
        }
        reaction.users.remove(user.id);

        updateMembers(client);

        const emoji = reaction._emoji.name;
        const { guild } = reaction.message;

        const roleName = emojis[emoji];
        if (!roleName) {
            return;
        }
        updateMembers(client);
        const role = guild.roles.cache.find((role) => role.name === roleName);
        const status = guild.roles.cache.get('775377928610775090');
        const roelPL = guild.roles.cache.get('844219922338938920');
        const member = guild.members.cache.find((member) => member.id === user.id);

        if (add) {
            member.roles.add(role).catch(console.log);
            member.roles.add(status).catch(console.log);
            member.roles.add(roelPL).catch(console.log);
        } else {
            member.roles.remove(role).catch(console.log);
            member.roles.remove(status).catch(console.log);
            member.roles.remove(roelPL).catch(console.log);
        }
    };

    client.on('messageReactionAdd', (reaction, user) => {
        if (reaction.message.channel.id === channelId) {
            handleReaction(reaction, user, true);
        }
    });
};

// process.on('unhandledRejection', error => {
// 	console.error('Unhandled promise rejection:', error);
// });
