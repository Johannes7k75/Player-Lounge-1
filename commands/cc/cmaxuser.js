module.exports = {
    name: 'maxuser',
    aliases: [],
    category: 'cc',
    permissions: [],
    utilisation: '{prefix}maxuser',
    prefix: 'cc!',

    execute(client, message, args) {
        const fs = require('fs');
        const ccFile = require('../../other/cc.json');
        let userCC;

        if (!args[0] || args[0] >= 100) return message.channel.send('Please enter a number between 1-99, 0 is unlimited');

        if (isNaN(args[0])) {
            if (args[0] === 'def' && args[1]) {
                ccFile.forEach((x) => {
                    x.userid === message.author.id;
                    userCC = ccFile.indexOf(x);
                });
                ccFile[userCC].settings.maxuser = args[1];
                let data = JSON.stringify(ccFile, null, '\t');
                fs.writeFileSync('./other/cc.json', data);
                console.log(ccFile[userCC].settings.maxuser);
                message.channel.send(`Your Create Channel has now a size for ${ccFile[userCC].settings.maxuser === '0' ? 'unlimited' : ccFile[userCC].settings.maxuser} user `);
            } else {
                return message.channel.send('Please specify a number of users');
            }
        } else {
            message.member.voice.channel.permissionOverwrites.map((perm) => {
                if (perm.id == message.member.id) {
                    perms = perm.allow.bitfield;
                }
            });

            if (perms && perms === 16) {
                if (message.member.voice.channel.parentID === '808436622696644648') {
                    if (args[[0]] <= 99) {
                        message.member.voice.channel.setUserLimit(args[0]).then((vc) => vc.member);
                    }
                }
            } else {
                message.channel.send('Only the creator of the channel can do taht');
            }
        }
    },
};
