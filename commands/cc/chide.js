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
    },
};
