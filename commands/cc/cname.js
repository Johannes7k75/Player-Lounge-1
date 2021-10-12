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
        let userCC;

        if (!args[0]) return message.channel.send('Please enter a name');
        ccFile.forEach((x) => {
            x.userid === message.author.id;
            userCC = ccFile.indexOf(x);
        });
        ccFile[userCC].settings.name = args[0];
        let data = JSON.stringify(ccFile, null, '\t');
        fs.writeFileSync('./other/cc.json', data);
    },
};
