module.exports = {
    name: 'name',
    aliases: [],
    category: 'cc',
    permissions: [],
    utilisation: '{prefix}name',
    prefix: 'cc!',

    async execute(client, message, args) {
        const fs = require('fs');
        const ccFile = require('../../other/cc.json');
        let userCC, perms;
        if (!args[0]) return message.channel.send('Please enter a name');
        if (args[0] === 'def') {
            if (!args[1]) return message.channel.send('Please enter a name');
            ccFile.forEach((x) => {
                x.userid === message.author.id;
                userCC = ccFile.indexOf(x);
            });
            ccFile[userCC].settings.name = args.join(' ');
            let data = JSON.stringify(ccFile, null, '\t');
            fs.writeFileSync('./other/cc.json', data);

            message.channel.send(`Default Name was changed to \`${args.join(' ')}\``);
            args.slice(1, 0);
        }
        message.member.voice.channel.permissionOverwrites.map((perm) => {
            if (perm.id == message.member.id) {
                perms = perm.allow.bitfield;
            }
        });

        if (perms && perms === 16) {
            if (message.member.voice.channel.parentID === '808436622696644648') message.member.voice.channel.setName(`${args.join(' ')}`);
        } else {
            message.channel.send('Only the creator of the channel can do taht');
        }
    },
};
