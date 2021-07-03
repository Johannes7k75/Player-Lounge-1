const Discord = require('discord.js');
module.exports = {
	name: 'updates',
	aliases: ['up'],
	category: 'moderation',
	utilisation: '{prefix}updates',

	execute(client, message) {
		message.delete();
		embed = new Discord.MessageEmbed().setColor('RANDOM').addFields(
			{
				name: 'Kanäle/Rollen',
				value: ':flag_de: <@&765985461096677457> Wir haben jetzt neue Channel mit den passenden rollen und Benachrichtigungen\n' + 'der offiziellen Servern in der Kategorie |I{•——» GAMES «——•}I| Hinzugefügt. :flag_de:\n\n',
			},
			{
				name: 'Channel/Roll',
				value: ':flag_gb: <@&765985461096677457> We have now added new channels with the appropriate roles and notifications\n' + ' from the official servers in the category |I{•——» GAMES «——•}I|. :flag_gb:',
			}
		);

		message.channel.send(embed);
	},
};
