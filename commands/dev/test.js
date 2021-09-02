const { rols } = require('../../config/bot');
module.exports = {
    name: 'test',
    aliases: [],
    category: 'Dev',
    role_permissions: [rols.dev],
    utilisation: '{prefix}test',

    execute(client, message, args) {

        const { MessageEmbed } = require('discord.js')
        const { MessageButton, MessageActionRow, MessageMenuOption, MessageMenu } = require('discord-buttons');

        let commands = {}
        let cat
        let embed = new MessageEmbed().setTitle('Help Menu').setColor('ORANGE').addFields({ name: 'Infos', value: 'Alles rund um den Bot' }, { name: 'Dev', value: 'Commands für die Developer' }, { name: 'Levelsystem', value: 'Alle Commands für das Levelsystem' }, { name: 'Moderation', value: 'Commands für die Team Mitglider zum Moderieren' })


        commands.infos = []; message.client.commands.filter(x => x.category == 'Infos').each((x) => commands.infos.push({ name: x.name, description: x.description, aliases: x.aliases, category: x.category, aliases: x.aliases, utilisation: x.utilisation, permissions: x.permissions }))
        commands.dev = []; message.client.commands.filter(x => x.category === 'Dev').map((x) => commands.dev.push({ name: x.name, description: x.description, aliases: x.aliases, category: x.category, aliases: x.aliases, utilisation: x.utilisation, permissions: x.permissions }))
        commands.levelsystem = []; message.client.commands.filter(x => x.category === 'Levelsystem').map(x => commands.levelsystem.push({ name: x.name, description: x.description, aliases: x.aliases, category: x.category, aliases: x.aliases, utilisation: x.utilisation, permissions: x.permissions }))
        commands.moderation = []; message.client.commands.filter(x => x.category === 'Moderation').map(x => commands.moderation.push({ name: x.name, description: x.description, aliases: x.aliases, category: x.category, aliases: x.aliases, utilisation: x.utilisation, permissions: x.permissions }))

        const menu = new MessageMenu()
            .setID('category')
            .setPlaceholder('Choose a category')

        for (i = 0; i < Object.keys(commands).length; i++) {
            let emoji
            if (Object.keys(commands)[i] === 'infos') {
                emoji = 'ℹ'
            } else if (Object.keys(commands)[i] === 'dev') {
                emoji = '⚠'
            } else if (Object.keys(commands)[i] === 'levelsystem') {
                emoji = '🏆'
            } else if (Object.keys(commands)[i] === 'moderation') {
                emoji = '🛡'
            }
            menu.addOption(new MessageMenuOption().setLabel(Object.keys(commands)[i]).setEmoji(emoji).setValue(`${Object.keys(commands)[i]}`))
        }

        client.on('clickMenu', async (menu) => {

            if (menu.values[0] === 'back_command') {

                let embed = new MessageEmbed().setTitle('Help Menu').setColor('ORANGE').addFields({ name: 'Infos', value: 'Alles rund um den Bot' }, { name: 'Dev', value: 'Commands für die Developer' }, { name: 'Levelsystem', value: 'Alle Commands für das Levelsystem' }, { name: 'Moderation', value: 'Commands für die Team Mitglider zum Moderieren' })


                const msgMenu = new MessageMenu()
                    .setID('category')
                    .setPlaceholder('Choose a category')

                for (i = 0; i < Object.keys(commands).length; i++) {
                    let emoji
                    if (Object.keys(commands)[i] === 'infos') {
                        emoji = 'ℹ'
                    } else if (Object.keys(commands)[i] === 'dev') {
                        emoji = '⚠'
                    } else if (Object.keys(commands)[i] === 'levelsystem') {
                        emoji = '🏆'
                    } else if (Object.keys(commands)[i] === 'moderation') {
                        emoji = '🛡'
                    }
                    msgMenu.addOption(new MessageMenuOption().setLabel(Object.keys(commands)[i]).setEmoji(emoji).setValue(`${Object.keys(commands)[i]}`))
                }

                menu.reply.send(`You choose: back to **Category**\nChoose another Category`, false).then(msg => { setTimeout(() => msg.delete(), 5000) })
                menu.message.edit(embed, msgMenu);
            }
            if (menu.id === 'category') {
                cat = menu.values[0]
                const select = new MessageMenu()
                    .setID('commands')
                    .setPlaceholder('Choose a command')

                select.addOption(new MessageMenuOption().setLabel('Back').setValue('back_command').setDescription('goes one step back').setEmoji('↩'))
                let embedCategory
                let embed = new MessageEmbed().setTitle('Help Menu').setColor('ORANGE')
                if (cat === 'infos') {
                    embed.addField('Infos', 'Alles rund um den Bot')
                } else if (cat === 'dev') {
                    embed.addField('Dev', 'Commands für die Developer')
                } else if (cat === 'levelsystem') {
                    embed.addField('Levelsystem', 'Alle Commands für das Levelsystem')
                } else if (cat === 'moderation') {
                    embed.addField('Moderation', 'Commands für die Team Mitglider zum Moderieren')
                } else {
                    embedCategory = { name: 'null', value: 'null' }
                }

                for (i = 0; i < commands[menu.values].length; i++) {
                    select.addOption(new MessageMenuOption().setLabel(commands[menu.values][i].name).setValue(commands[menu.values][i].name).setDescription(commands[menu.values][i].description))
                }
                menu.message.edit(embed, select)
                menu.reply.send(`You choose: **${menu.values}**`, false).then(msg => { setTimeout(() => msg.delete(), 5000) })
            }
            if (menu.id === 'commands') {


                const cmdMenu = new MessageMenu()
                    .setID('commands')
                    .setPlaceholder('Choose another command')

                cmdMenu.addOption(new MessageMenuOption().setLabel('Back').setValue('back_command').setDescription('goes one step back').setEmoji('↩'))
                let embed
                for (i = 0; i < commands[cat].length; i++) {
                    if (commands[cat][i].name === menu.values[0]) {
                        embed = new MessageEmbed()
                            .setTitle('Help Menu')
                            .setColor('ORANGE')
                            .addFields(
                                { name: `Name`, value: commands[cat][i].name, inline: true },
                                { name: 'Category', value: commands[cat][i].category, inline: true },
                                { name: 'Aliase(s)', value: commands[cat][i].aliases.length < 1 ? 'None' : commands[cat][i].aliases.join(', '), inline: true },
                                { name: 'Utilisation', value: commands[cat][i].utilisation.replace('{prefix}', client.config.discord.prefix), inline: true },
                                { name: 'Permissions', value: commands[cat][i].permissions.length < 1 ? 'None' : commands[cat][i].permissions.join(', '), inline: true },
                            )
                            .setDescription('Find information on the command provided.\nMandatory arguments `[]`, optional arguments `<>`.')
                            .setAuthor('Help pannel')
                            .setTimestamp(new Date())
                    }
                }
                for (i = 0; i < commands[cat].length; i++) {
                    cmdMenu.addOption(new MessageMenuOption().setLabel(commands[cat][i].name).setValue(commands[cat][i].name).setDescription(commands[cat][i].description))
                }

                menu.reply.send(`You choose: ** ${menu.values} ** `, false).then(msg => { setTimeout(() => msg.delete(), 5000) })

                menu.message.edit(embed, cmdMenu)
            }
        })
        message.channel.send(embed, menu);
    },
};
