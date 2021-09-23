module.exports = (client) => {
    const guild = client.guilds.cache.get('685176247726374961');
    const updateMembers = (guild) => {
        const memberCountChannel = guild.channels.cache.get('802559625702539274');
        memberCountChannel.setName(`Members: ${guild.roles.cache.get('765985461096677457').members.size}`);
        console.log(guild.roles.cache.get('765985461096677457').members.size);
    };

    client.on('guildMemberAdd', (member) => updateMembers(member.guild));
    console.log('Join Update Member');
    client.on('guildMemberRemove', (member) => updateMembers(member.guild));
    console.log('Leave Update Member');

    updateMembers(guild);
};
