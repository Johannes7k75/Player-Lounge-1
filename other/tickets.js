module.exports = async (client) => {
    // Change here title, description or color of the embed
    ticket = { title: 'Ticket', description: 'To creat a Ticket click 📩', color: '#0F9E67' };

    const { MessageButton, MessageActionRow } = require('discord-buttons');
    const { MessageEmbed, MessageAttachment, Permissions } = require('discord.js');
    const { fetchTranscript } = require('discord-ghost-transcript');
    const fs = require('fs');
    const tickets = require('./tickets.json');
    let btns, embed;

    // Buttons that can be used
    let btn0 = new MessageButton().setLabel('Create a Ticket').setStyle('green').setEmoji('📩').setID('createTicket');
    let btn1 = new MessageButton().setLabel('Close').setStyle('grey').setEmoji('🔒').setID('lockTicket');
    let btn2 = new MessageButton().setLabel('Reopen').setStyle('grey').setEmoji('🔓').setID('unlockTicket');
    let btn3 = new MessageButton().setLabel('Delete').setStyle('blurple').setEmoji('⛔').setID('delChannel');
    let btn4 = new MessageButton().setLabel('Transcript').setStyle('gray').setEmoji('📑').setID('createTranscript');
    let btn5 = new MessageButton().setLabel('Close').setStyle('red').setID('closeTicketClose');
    let btn6 = new MessageButton().setLabel('Cancel').setStyle('grey').setID('closeTicketCancel');
    let btn7 = new MessageButton().setLabel('Add a user').setStyle('gray').setEmoji('➕').setID('userAdd');
    let btn8 = new MessageButton().setLabel('Remove a user').setStyle('gray').setEmoji('➖').setID('removeUser');

    // Ticket creator
    embed = new MessageEmbed().setTitle(ticket.title).setDescription(ticket.description).setColor(ticket.color);

    const ticketCCh = await client.channels.fetch('879362496035704933');
    ticketCCh.messages.fetch().then((messages) => {
        if (messages.size === 0) {
            ticketCCh.send(embed, btn0);
        } else {
            for (const message of messages) {
                message[1].edit(embed, btn0);
            }
        }
    });

    // Ticket handler stuff
    client.on('clickButton', async (btn) => {
        if (btn.id === 'createTicket') {
            ticketch = await btn.message.guild.channels.create(`${btn.clicker.user.username}s-ticket`, {
                permissionOverwrites: [
                    { id: btn.message.guild.id, deny: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES] },
                    { id: btn.clicker.user.id, allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES] },
                    { id: require('../config/bot').role.team.id, allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES] },
                ],
            });
            tickets.push({ creator: { id: btn.clicker.user.id, name: btn.clicker.user.username }, timestamp: Date.now(), ticketch: ticketch.id });
            fs.writeFile('./other/tickets.json', JSON.stringify(tickets, null, '\t'), (err) => {
                if (err) {
                    console.error(err);
                }
            });
            btn.reply.send(`You Ticket was opened <#${ticketch.id}>`, true);

            btns = new MessageActionRow().addComponents([btn1.setDisabled(false), btn7, btn8]);
            embed = new MessageEmbed().setDescription('Support will be with you shortly.\nTo close this ticket react with 🔒').setTitle(`Welcome ${btn.clicker.user.username}`).setColor('#0F9E67');
            client.channels.cache.get(ticketch.id).send(embed, btns);
        }

        if (btn.id === 'userAdd') {
            btn.reply.send('Send an user Id that you want to add', true);
            const filter = (m) => m.author.bot === false && m.author.id === btn.clicker.user.id;
            btn.message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then((coll) => {
                btn.message.channel.updateOverwrite(client.guilds.cache.get(btn.message.guild.id).members.cache.get(coll.first().content).id, { VIEW_CHANNEL: true, SEND_MESSAGES: true });
                btn.reply.edit(`User ${client.guilds.cache.get(btn.message.guild.id).members.cache.get(coll.first().content).user.username} was added`);
                coll.first().delete();
            });
        }

        if (btn.id === 'removeUser') {
            btn.reply.send('Send an user Id that you want to remove', true);
            const filter = (m) => m.author.bot === false && m.author.id === btn.clicker.user.id;
            btn.message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then((coll) => {
                btn.message.channel.updateOverwrite(client.guilds.cache.get(btn.message.guild.id).members.cache.get(coll.first().content).id, { VIEW_CHANNEL: false, SEND_MESSAGES: false });
                btn.reply.edit(`User ${client.guilds.cache.get(btn.message.guild.id).members.cache.get(coll.first().content).user.username} was removed`);
                coll.first().delete();
            });
        }

        if (btn.id === 'lockTicket') {
            btns = new MessageActionRow().addComponents([btn4, btn2, btn3]);
            embed = new MessageEmbed().setTitle('Ticket locked').setDescription(`Ticket was locked by <@${btn.clicker.user.id}>`).setColor('#FAA81A');
            btn.message.channel.send(embed, btns);
            btn.message.channel.updateOverwrite(getTicketCreator(client, btn, tickets).id, { SEND_MESSAGES: false });
            btn.reply.defer();
        }

        if (btn.id === 'unlockTicket') {
            embed = new MessageEmbed().setTitle('Ticket reopened').setDescription(`Ticket was reopened by <@${btn.clicker.user.id}>`).setColor('#0A6B45');
            btns = new MessageActionRow().addComponents([btn1.setDisabled(false)]);
            btn.message.channel.send(embed, btns);
            btn.message.channel.updateOverwrite(getTicketCreator(client, btn, tickets).id, { SEND_MESSAGES: true });
            btn.reply.defer();
        }

        if (btn.id === 'delChannel') {
            if (btn.clicker.user.id === tickets.find((ticket) => (ticket.ticketch = btn.message.channel.id)).creator.id && !getTicketCreator(client, btn, tickets).roles.cache.has(require('../config/bot').role.team.id)) {
                btn.reply.send('You dont have the permissions to do that', true);
                return;
            }

            const channel = btn.message.channel;
            let transcript = await fetchTranscript(channel, btn.message, 99);
            let ticket = getTicket(client, btn, require('./tickets.json'));

            embed = new MessageEmbed()
                .setTitle(`Ticket ${btn.message.channel.name}`)
                .setDescription(`User: \`${ticket.creator.name}\`\n> ${ticket.creator.id}\nTicket Created <t:${Math.floor(ticket.timestamp / 1000)}:R>`)
                .setColor('#5CC984');

            btn.message.guild.channels.cache.get('889179544999825418').send(embed);
            btn.message.guild.channels.cache.get('889179544999825418').send(new MessageAttachment(transcript, 'index.html'));

            btn.reply.defer();
            btn.message.channel.delete();
        }

        if (btn.id === 'createTranscript') {
            if (btn.clicker.user.id === tickets.find((ticket) => (ticket.ticketch = btn.message.channel.id)).creator.id && !getTicketCreator(client, btn, tickets).roles.cache.has(require('../config/bot').role.team.id)) {
                btn.reply.send('You dont have the permissions to do that', true);
                return;
            }
            const channel = btn.message.channel;
            let transcript = await fetchTranscript(channel, btn.message, 99);
            btn.message.channel.send(new MessageAttachment(transcript, 'index.html'));
            btn.reply.defer();
        }
    });
};

function getTicketCreator(client, btn, tickets) {
    return client.guilds.cache.get(btn.message.guild.id).members.cache.get(tickets.find((ticket) => (ticket.ticketch = btn.message.channel.id)).creator.id);
}

function getTicket(client, btn, tickets) {
    let ticket;
    for (i = 0; i < tickets.length; i++) {
        if (tickets[i].ticketch === btn.message.channel.id) {
            ticket = tickets[i];
        }
    }
    return ticket;
}
