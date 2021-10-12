module.exports = {
    name: 'ban',
    aliases: [],
    category: 'cc',
    permissions: [],
    utilisation: '{prefix}ban',
    prefix: 'cc!',

    execute(client, message, args) {
        const fs = require('fs');
        const ccFile = require('../../other/cc.json');
        let userCC;
        if (message.mentions.users.size === 0) return message.channel.send('Please mention a user');
        ccFile.forEach((x) => {
            x.userid === message.author.id;
            userCC = ccFile.indexOf(x);
        });
        if (!ccFile[userCC].settings.banned.includes(message.mentions.users.first().id)) {
            console.log(message.mentions.users.first().id);
            ccFile[userCC].settings.banned.push(message.mentions.users.first().id);
        } else {
            return message.channel.send('This user is already banned');
        }
        let data = JSON.stringify(ccFile, null, '\t');
        fs.writeFileSync('./other/cc.json', data);
    },
};
