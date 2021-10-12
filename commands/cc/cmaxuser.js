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
        ccFile.forEach((x) => {
            x.userid === message.author.id;
            userCC = ccFile.indexOf(x);
        });
        ccFile[userCC].settings.maxuser = args[0];
        let data = JSON.stringify(ccFile, null, '\t');
        fs.writeFileSync('./other/cc.json', data);
        console.log(ccFile[userCC].settings.maxuser);
        message.channel.send(`Your Create Channel has now a size for ${ccFile[userCC].settings.maxuser === '0' ? 'unlimited' : ccFile[userCC].settings.maxuser} user `);
    },
};
