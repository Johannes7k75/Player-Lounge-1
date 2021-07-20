/**
 * @prettier
 */
module.exports = {
    name: 'restart',
    aliases: ['re'],
    category: 'moderation',
    permissions: [],
    utilisation: '{prefix}restart [BOT]',

    async execute(client, message, args) {
        const { exec } = require('child_process');
        const chalk = require('chalk');
        const Discord = require('discord.js');

        if (!message.member.roles.cache.has('844206736197550100')) return;
        if (!args[0]) return;
        const arg = args.shift().toLowerCase();

        if (arg === 'ls' || arg === 'list') {
            exec('pm2 ls -m | egrep "pm2 id|namespace"', (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`ERROR >> ${stderr}`);
                    return;
                }
                const pm2_id_ns = stdout
                    .replace(/namespace :/g, 'Name')
                    .replace(/pm2 id :/g, 'ID')
                    .replace(/\n/g, ' ')
                    .split(/ +/g);
                const pm2_id_ns_length = pm2_id_ns.length - 1;

                const embed = new Discord.MessageEmbed().setTitle('PM2 list').setURL('https://app.pm2.io/');
                var i;
                for (i = 1; i < pm2_id_ns_length; i += 4) {
                    embed.addFields({
                        name: pm2_id_ns[i],
                        value: pm2_id_ns[i + 2],
                        inline: false,
                    });
                }
                message.channel.send(embed);
            });
        }

        if (arg === 'player-lounge' || arg === 'pl' || arg === 'p' || arg === '0') {
            message.channel.send('restart `Player-Lounge`');
            exec('pm2 restart 0', (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`ERROR >> ${stderr}`);
                    return;
                }
                console.log(`OUT   >> ${stdout}`);
            });
        }
        if (arg === 'odine' || arg === 'o' || arg === '1') {
            message.channel.send('restart `Odine-Music`');
            exec('pm2 restart 1', (error, stdout, stderr) => {
                if (error) {
                    console.log('ERROR >> ' + chalk.red(`${error.message}`));
                    return;
                }
                if (stderr) {
                    console.log('ERROR >> ' + chalk.red(`${stderr}`));
                    return;
                }
                console.log(`OUTPU >> ${stdout}`);
            });
        }
        if (arg === 'calypso' || arg === 'c' || arg === '2') {
            message.channel.send('restart `Calypso-Music`');
            exec('pm2 restart 2', (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`ERROR >> ${stderr}`);
                    return;
                }
                console.log(`OUT   >> ${stdout}`);
            });
        }
    },
};
