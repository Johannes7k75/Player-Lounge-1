module.exports = {
    name: 'reactionrole-games',
    aliases: ['rr-games'],
    description: 'Embeds!',
    async execute(client, message, args) {
        const Discord = require('discord.js');
        const gamesMessage = '815651928193105980';
        const channel = client.config.discord.reactionchannel;
        // const MiniGamesRole = message.guild.roles.cache.get('743858855313801316');
        const ApexRole = message.guild.roles.cache.find((role) => role.name === 'Apex');
        const ArkRole = message.guild.roles.cache.find((role) => role.name === 'ARK');
        const ArmaRole = message.guild.roles.cache.find((role) => role.name === 'Arma');
        const AmonfUsRole = message.guild.roles.cache.find((role) => role.name === 'Among Us');
        const BattleFrontRole = message.guild.roles.cache.find((role) => role.name === 'Battle Front');
        const CallofDutyRole = message.guild.roles.cache.find((role) => role.name === 'Call of Duty');
        const CSGORole = message.guild.roles.cache.find((role) => role.name === 'CSGO');
        const ECORole = message.guild.roles.cache.find((role) => role.name === 'Eco');
        const GarrysModRole = message.guild.roles.cache.find((role) => role.name === "Garry's Mod");
        const GTARole = message.guild.roles.cache.find((role) => role.name === 'GTA V');
        // const LOLRole = message.guild.roles.cache.find((role) => role.name === 'LOL');
        const MinecraftRole = message.guild.roles.cache.find((role) => role.name === 'Minecraft');
        const Rainbow6SiegeRole = message.guild.roles.cache.find((role) => role.name === 'Rainbow6Siege');
        const RocketLeagueRole = message.guild.roles.cache.find((role) => role.name === 'Rocket League');
        const SatisfactoryRole = message.guild.roles.cache.find((role) => role.name === 'Satisfactory');
        const SpaceEngineersRole = message.guild.roles.cache.find((role) => role.name === 'Space Engineers');
        const WatchDogsRole = message.guild.roles.cache.find((role) => role.name === 'Watch Dogs');

        const ApexEmoji = '<:Apex:839890651608645683>';
        const ArkEmoji = '<:ARK:733334992947511337>';
        const ArmaEmoji = '<:ARMA:733336184453070849>';
        const AmongUSEmoji = '<:AU:762334576076783616>';
        const BattleFrontEmoji = '<:Battlefront:801180325958385734>';
        const CODEmoji = '<:COD:862062378609541180>';
        const CSGOEmoji = '<:CSGO:733336448404553860>';
        const ECOEmoji = '<:ECO:733335069732634816>';
        const GarrysModEmoji = '<:GM:733335087005040650>';
        const GTAEmoji = '<:GTA:733335887152283769>';
        // const LOLEmoji = '<:LOL:733335119255044148>';
        const MinecraftEmoji = '<:MC:733335137298939935>';
        const Rainbow6SiegeEmoji = '<:R6S:733335151060451348>';
        const RocketLeagueEmoji = '<:RL:760926585179865129>';
        const SatisfactoryEmoji = '<:Satisfactory:801178296129683476>';
        const SpaceEngineersEmoji = '<:SE:725608377454952479>';
        const WatchDogsEmoji = '<:WD:733338295353737387>';
        // const MiniGamesEmoji = '<:viedeogame:806948028795060299>';

        message.channel.bulkDelete(1);
        let embed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Games')
            .setDescription(
                'please choose the games you own\n\n' +
                    `${ApexEmoji} : Apex\n` +
                    `${ArkEmoji} : Ark\n` +
                    `${ArmaEmoji} : ARMA\n` +
                    `${AmongUSEmoji} : Among Us\n` +
                    `${BattleFrontEmoji} : Battle Front\n` +
                    `${CODEmoji} : Call of Duty\n` +
                    `${CSGOEmoji} : CSGO\n` +
                    `${ECOEmoji} : ECO\n` +
                    `${GarrysModEmoji} : Garry's Mod\n` +
                    `${GTAEmoji} : GTA V\n` +
                    // `${LOLEmoji} : LOL\n` +
                    `${MinecraftEmoji} : Minecraft\n` +
                    `${Rainbow6SiegeEmoji} : Rainbow Six Siege\n` +
                    `${RocketLeagueEmoji} : Rocket League\n` +
                    `${SatisfactoryEmoji} : Satisfactory\n` +
                    `${SpaceEngineersEmoji} : Space Engineers\n` +
                    `${WatchDogsEmoji} : Watch Dogs\n\n`
            );

        let messageEmbed = await message.channel.send(embed);

        
        messageEmbed.react(ApexEmoji).catch(console.log);
        messageEmbed.react(ArkEmoji);
        messageEmbed.react(ArmaEmoji);
        messageEmbed.react(AmongUSEmoji);
        messageEmbed.react(BattleFrontEmoji);
        messageEmbed.react(CODEmoji);
        messageEmbed.react(CSGOEmoji);
        messageEmbed.react(ECOEmoji);
        messageEmbed.react(GarrysModEmoji);
        messageEmbed.react(GTAEmoji);
        // messageEmbed.react(LOLEmoji);
        messageEmbed.react(MinecraftEmoji);
        messageEmbed.react(Rainbow6SiegeEmoji);
        messageEmbed.react(RocketLeagueEmoji);
        messageEmbed.react(SatisfactoryEmoji);
        messageEmbed.react(SpaceEngineersEmoji);
        messageEmbed.react(WatchDogsEmoji);
        // messageEmbed.react(MiniGamesEmoji);

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id === channel && reaction.message.id === gamesMessage) {
                if (reaction.emoji.name === 'Apex') {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(ApexRole).catch(console.error);
                }
                if (reaction.emoji.name === 'ARK') {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(ArkRole).catch(console.error);
                }
                if (reaction.emoji.name === 'ARMA') {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(ArmaRole).catch(console.error);
                }
                if (reaction.emoji.name === 'AU') {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(AmonfUsRole).catch(console.error);
                }
                if (reaction.emoji.name === 'Battle Front') {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(BattleFrontRole).catch(console.error);
                }
                if (reaction.emoji.name === 'Call of Duty') {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(CallofDutyRole).catch(console.error);
                }
                if (reaction.emoji.name === 'CSGO') {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(CSGORole).catch(console.error);
                }
                if (reaction.emoji.name === 'ECO') {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(ECORole).catch(console.error);
                }
                if (reaction.emoji.name === 'GM') {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(GarrysModRole).catch(console.error);
                }
                if (reaction.emoji.name === 'GTA') {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(GTARole).catch(console.error);
                }
                // if (reaction.emoji.name === 'LOL') {
                //     await reaction.message.guild.members.cache.get(user.id).roles.add(LOLRole).catch(console.error);
                // }
                if (reaction.emoji.name === 'MC') {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(MinecraftRole).catch(console.error);
                }
                if (reaction.emoji.name === 'R6S') {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(Rainbow6SiegeRole).catch(console.error);
                }
                if (reaction.emoji.name === 'RL') {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(RocketLeagueRole).catch(console.error);
                }
                if (reaction.emoji.name === 'Satisfactory') {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(SatisfactoryRole).catch(console.error);
                }
                if (reaction.emoji.name === 'SE') {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(SpaceEngineersRole).catch(console.error);
                }
                if (reaction.emoji.name === 'WD') {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(WatchDogsRole).catch(console.error);
                }
                // if (reaction.emoji.name === 'viedeogame') {
                //     await reaction.message.guild.members.cache.get(user.id).roles.add(MiniGamesRole).catch(console.error);
                // }
            } else {
                return;
            }
        });

        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id === channel) {
                if (reaction.emoji.name === 'Apex') {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(ApexRole).catch(console.error);
                }
                if (reaction.emoji.name === 'ARK') {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(ArkRole).catch(console.error);
                }
                if (reaction.emoji.name === 'ARMA') {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(ArmaRole).catch(console.error);
                }
                if (reaction.emoji.name === 'AU') {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(AmonfUsRole).catch(console.error);
                }
                if (reaction.emoji.name === 'Battle Front') {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(BattleFrontRole).catch(console.error);
                }
                if (reaction.emoji.name === 'CSGO') {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(CSGORole).catch(console.error);
                }
                if (reaction.emoji.name === 'ECO') {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(ECORole).catch(console.error);
                }
                if (reaction.emoji.name === 'GM') {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(GarrysModRole).catch(console.error);
                }
                if (reaction.emoji.name === 'GTA') {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(GTARole).catch(console.error);
                }
                // if (reaction.emoji.name === 'LOL') {
                //     await reaction.message.guild.members.cache.get(user.id).roles.remove(LOLRole).catch(console.error);
                // }
                if (reaction.emoji.name === 'MC') {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(MinecraftRole).catch(console.error);
                }
                if (reaction.emoji.name === 'R6S') {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(Rainbow6SiegeRole).catch(console.error);
                }
                if (reaction.emoji.name === 'RL') {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(RocketLeagueRole).catch(console.error);
                }
                if (reaction.emoji.name === 'Satisfactory') {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(SatisfactoryRole).catch(console.error);
                }
                if (reaction.emoji.name === 'SE') {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(SpaceEngineersRole).catch(console.error);
                }
                if (reaction.emoji.name === 'WD') {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(WatchDogsRole).catch(console.error);
                }
                // if (reaction.emoji.name === 'viedeogame') {
                //     await reaction.message.guild.members.cache.get(user.id).roles.remove(MiniGamesRole).catch(console.error);
                // }
            } else {
                return;
            }
        });
    },
};
