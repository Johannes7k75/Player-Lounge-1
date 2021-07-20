module.exports = (client, member, message, Discord) => {
    // const updateMembers = require('../../counters/member-counter');
    // const guild = client.guilds.cache.get('685176247726374961');
    // updateMembers(guild);
    // console.log('Leave Update Member');
    if (member.id === '811946572300156998') return;
    client.channels.cache.get('795904123765129237').send(`**${member.user.username}#${member.user.discriminator}** hat den Server verlassen!:expressionless:`);
};
