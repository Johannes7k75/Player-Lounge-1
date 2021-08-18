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
        embed = new Discord.MessageEmbed().setTitle('Commands').addFields(
            {
                name: '.help',
                value: 'gibt dir alle commands'
            },
            {
                name: '.newv',
                value: 'schickt dir das neuste Mucki Video'
            }
        )
        message.channel.send(embed)
        // message.delete();
        // message.channel.send(`<t:${Math.floor(Date.now() / 1000)}:R>`);
        // message.channel.send(`${Math.floor(Date.now())}`);
        // message.channel.send('Test 2').then((msg) => msg.delete({ timeout: 10000 }));
    },
};
