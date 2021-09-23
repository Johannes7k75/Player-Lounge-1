module.exports = {
    name: 'debug',
    aliases: [],
    category: 'Dev',
    permissions: [],
    utilisation: '{prefix}debug',

    async execute(client, message) {
        const discord = require('discord.js');
        let embed = new discord.MessageEmbed()
            .setTitle('Test1')
            .addFields(
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
