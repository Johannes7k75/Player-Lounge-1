/**
 * @prettier
 */
const gamesMessage = require('./claim');
const Discord = require('discord.js');

module.exports = async (client) => {
    const channelId = '685180105110454337';

    const getEmoji = (emojiName) => client.emojis.cache.find((emoji) => emoji.name === emojiName);

    const ApexEmoji = '<:Apex:839890651608645683>';
    const ArkEmoji = '<:ARK:733334992947511337>';
    const AmongUSEmoji = '<:AU:762334576076783616>';
    const BattleFrontEmoji = '<:Battlefront:801180325958385734>';
    const CSGOEmoji = '<:CSGO:733336448404553860>';
    const CODEmoji = '<:COD:862062378609541180>';
    const ECOEmoji = '<:ECO:733335069732634816>';
    const GarrysModEmoji = '<:GM:733335087005040650>';
    const GTAEmoji = '<:GTA:733335887152283769>';
    const MinecraftEmoji = '<:MC:733335137298939935>';
    const MinigamesEmoji = '<:Minigames:806948028795060299>';
    const Rainbow6SiegeEmoji = '<:R6S:733335151060451348>';
    const RocketLeagueEmoji = '<:RL:760926585179865129>';
    const SatisfactoryEmoji = '<:Satisfactory:801178296129683476>';
    const SpaceEngineersEmoji = '<:SE:725608377454952479>';
    const StarbaseEmoji = '<:Starbase:875814526451351552>';
    const ValorantEmoji = '<:Valorant:880115112176926791>';
    const WatchDogsEmoji = '<:WD:733338295353737387>';

    const emojis = {
        // Emoji: Role
        Apex: 'Apex',
        ARK: 'ARK',
        AU: 'Among Us',
        Battlefront: 'Battlefront',
        CSGO: 'CSGO',
        COD: 'Call of Duty',
        ECO: 'Eco',
        GM: "Garry's Mod",
        GTA: 'GTA V',
        MC: 'Minecraft',
        R6S: 'Rainbow6Siege',
        RL: 'Rocket League',
        Satisfactory: 'Satisfactory',
        Starbase: 'Starbase',
        SE: 'Space Engineers',
        Valorant: 'Valorant',
        WD: 'Watch Dogs',
        Minigames: 'Minigames',
    };

    const reactions = [];

    let emojiText = '';
    for (const key in emojis) {
        const emoji = getEmoji(key);
        reactions.push(emoji);

        const role = emojis[key];

        emojiText = new Discord.MessageEmbed()
            .setTitle('Games')
            .setColor('#ff0000')
            .setDescription(
                'Please choose the games you own\n\n' +
                `${ApexEmoji} : Apex\n` +
                `${ArkEmoji} : Ark\n` +
                `${AmongUSEmoji} : Among Us\n` +
                `${BattleFrontEmoji} : Battle Front\n` +
                `${CSGOEmoji} : CSGO\n` +
                `${CODEmoji} : Call of Duty\n` +
                `${ECOEmoji} : Eco\n` +
                `${GarrysModEmoji} : Garry's Mod\n` +
                `${GTAEmoji} : GTA V\n` +
                `${MinecraftEmoji} : Minecraft\n` +
                `${Rainbow6SiegeEmoji} : Rainbow Six Siege\n` +
                `${RocketLeagueEmoji} : Rocket League\n` +
                `${SatisfactoryEmoji} : Satisfactory\n` +
                `${StarbaseEmoji} : Starbase\n` +
                `${SpaceEngineersEmoji} : Space Engineers\n` +
                `${ValorantEmoji} : Valorant\n` +
                `${WatchDogsEmoji} : Watch Dogs\n\n` +
                `${MinigamesEmoji} : Minigames\n\n` +
                `Wenn du mit den Minigames spielen möchtest dann, Reagiere mit dem ${MinigamesEmoji}\n Es läuft üder den **Grudge-Bot** mit dem **Prefix: g!**`
            );
    }
    gamesMessage(client, channelId, emojiText, reactions);

    const handleReaction = async (reaction, user, add) => {
        if (user.id === '743800065650327572') {
            return;
        }
        reaction.users.remove(user.id);
        const emoji = reaction._emoji.name;

        const { guild } = reaction.message;

        const roleName = emojis[emoji];
        if (!roleName) {
            return;
        }

        let role = guild.roles.cache.find((role) => role.name === roleName);
        let spiele = guild.roles.cache.get('775362618675560498');
        let member = guild.members.cache.find((member) => member.id === user.id);

        if (member.roles.cache.has(role.id)) {
            await member.roles.remove(role) //.catch(console.log);
        } else {
            await member.roles.add(role) //.catch(console.log);
        }


        member = await guild.members.cache.find((member) => member.id === user.id);


        let arr = ['Minigames', 'Apex', 'ARK', 'Among Us', 'Battlefront', 'Call of Duty', "Garry's Mod", 'GTA V', 'Minecraft', 'Rainbow6Siege', 'Rocket League', 'Satisfactory', 'Starbase', 'Space Engineers', 'Valorant', 'Watch Dogs']
        for (i = 0; i < arr.length; i++) {
            if (member.roles.cache.has(guild.roles.cache.find((role) => role.name === arr[i]).id)) {
                member.roles.add(spiele) //.catch(console.log);

                return
            }

        }
        member.roles.remove(spiele) //.catch(console.log);
    };

    client.on('messageReactionAdd', (reaction, user) => {
        if (reaction.message.channel.id === channelId) {
            handleReaction(reaction, user, true);
        }
    });

};