### Player-Lounge
is a Moderation Bot for [Player-Lounge](https://discord.gg/29NEpHcn9u)

config:
-   create a folder with the Name `config`
-   create a file in there with the name `bot.js` the content of the file is
```
module.exports = {
    discord: {
		token: 'BOT Token',
        prefix: '!',
        activity: 'https://player-lounge.de',
        reactionchannel: '685180105110454337',
        invite_link: 'https://discord.gg/29NEpHcn9u',
        invite_code: '29NEpHcn9u',
        website: 'https://player-lounge.de/',
        guild_id: '685176247726374961',
    },
    mongo: {
        mongo: 'Mongo db link for discordbot'
    }
};
```
  
-   BOT Token: [Here the Link](https://discord.com/developers/applications/743800065650327572/bot)