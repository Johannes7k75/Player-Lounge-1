module.exports = {
    name: 'debug',
    aliases: [],
    category: 'Dev',
    permissions: [],
    utilisation: '{prefix}debug',

    async execute(client, message) {
        const discord = require('discord.js');
        let embed = new discord.MessageEmbed()
            .setTitle('Rollen Informationen/Aufgaben')
            .addFields(
                { name: 'Owner', value: 'value1' },
                { name: 'Co.Owner', value: 'value1' },
                { name: 'Admin', value: 'value1' },
                { name: 'Co.Admin', value: 'value1' },
                { name: 'Moderator', value: 'value1' },
                { name: 'Co.Moderator', value: 'value1' },
                { name: 'Supporter', value: 'value1' },
                { name: 'Co.Supporter', value: 'value1' },
                { name: 'Developer', value: 'value1' },
                { name: 'Designer', value: 'value1' },
                { name: 'Slaves', value: 'value1' },
                { name: 'Team', value: 'value1' },
                { name: 'VIP', value: 'value1' },
                { name: 'title1', value: 'value1' },
                { name: 'title1', value: 'value1' },
                { name: 'title1', value: 'value1' },
                { name: 'title1', value: 'value1' },
                { name: 'title1', value: 'value1' },
                { name: 'title1', value: 'value1' },
                { name: 'title1', value: 'value1' },
                { name: 'title1', value: 'value1' },
                { name: 'title1', value: 'value1' },
                { name: 'title1', value: 'value1' },
                { name: 'title1', value: 'value1' },
                { name: 'title1', value: 'value1' },
                { name: 'title1', value: 'value1' },
                { name: 'title1', value: 'value1' },
                { name: 'title1', value: 'value1' },
                { name: 'title1', value: 'value1' },
                { name: 'title1', value: 'value1' },
                { name: 'title1', value: 'value1' },
                { name: 'title1', value: 'value1' },
                { name: 'title1', value: 'value1' },
                { name: 'title1', value: 'value1' }
            )
            .setColor('RANDOM');
        message.channel.send(embed);
    },
};
