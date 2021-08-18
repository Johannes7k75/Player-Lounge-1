module.exports = async (client) => {
    console.log('Player-Lounge Bot is Online!');
    console.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} members and a total of ${client.guilds.cache.get('685176247726374961').roles.cache.get('765985461096677457').members.size} of users`);
    client.user.setActivity(`${client.config.discord.prefix}help | bit.ly/3qUjF5i`, { type: 'PLAYING', url: 'https://www.Player-Lounge.de/' });
    require('../../counters/member-counter')(client);
    require('../../commands/rr-claim/rr-games')(client);
    require('../../commands/rr-claim/r-regeln')(client);
    require('../../other/levels')(client);
    require('../../other/jointocreate')(client);
    await require('../../other/mongo')()
        .then((mongoose) => {
            try {
                console.log('Connected to mongo Cloud!');
            } finally {
                mongoose.connection.close();
            }
        })
        .catch(console.log);
    await require('../../other/mongo_local')()
        .then((mongoose) => {
            try {
                console.log('Connected to mongo Local!');
            } finally {
                mongoose.connection.close();
            }
        })
        .catch(console.log);
};
