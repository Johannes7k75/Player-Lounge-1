module.exports = {
    name: 'hide',
    aliases: [],
    category: 'cc',
    permissions: [],
    utilisation: '{prefix}hide',
    prefix: 'cc!',

    execute(client, message, args) {
        const fs = require('fs');
        const ccFile = require('../../other/cc.json');
        let userCC;
        if (args[0] === 'def') {
            ccFile.forEach((x) => {
                x.userid === message.author.id;
                userCC = ccFile.indexOf(x);
            });
            if (ccFile[userCC].settings.hidden === true) {
                ccFile[userCC].settings.hidden = false;
            } else {
                ccFile[userCC].settings.hidden = true;
            }
            let data = JSON.stringify(ccFile, null, '\t');
            fs.writeFileSync('./other/cc.json', data);
            message.channel.send(`Your Create Channel is ${ccFile[userCC].settings.hidden === false ? '`not hidden`' : '`hidden`'}`);
        } else {
            let userEveryone = message.guild.roles.cache.get('765985461096677457');
            message.member.voice.channel.permissionOverwrites // { id: userEveryone.id, allow: ['VIEW_CHANNEL'] }
                .map((perm) => {
                    if (perm.id == message.member.id) {
                        perms = perm.allow.bitfield;
                    }
                });
            let tof = true;
            // 1024
            console.log();
            if (perms && perms === 16) {
                message.member.voice.channel.permissionOverwrites.map((x) => {
                    if (x.id === message.user.id) {
                        if (x.allow.bitfield === 1024) {
                            tof = false;
                            return tof;
                        } else if (x.deny === 1024) {
                            tof = true;
                            return tof;
                        }
                    }
                });
                console.log(tof);

                if (message.member.voice.channel.parentID === '808436622696644648') message.member.voice.channel.updateOverwrite(userEveryone, { VIEW_CHANNEL: tof });
            } else {
                message.channel.send('Only the creator of the channel can do that');
            }
        }
    },
};
