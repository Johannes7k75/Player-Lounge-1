const fs = require('fs');
module.exports = (client, message, Discord) => {
	const prefix = client.config.discord.prefix;

	const args = message.content.slice(client.config.discord.prefix.length).trim().split(/ +/g);
	if (message.author.bot || message.channel.type === 'dm' || !message.content.startsWith(prefix) || message.content === client.config.discord.prefix) return;
	const commands = args.shift().toLowerCase();
	const cmds = client.commands.get(commands) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commands));
	let teamRole = message.guild.roles.cache.find((r) => r.name === 'Team');
	
	

	if (message.member.roles.cache.has(teamRole.id)) {
		if (cmds) cmds.execute(client, message, args, Discord);
		// Loging the who acces team commands
		var stream = fs.createWriteStream('./config/log.txt', { flags: 'a' });
		console.log('write stream');
		stream.write(message.author.username + '[' + 'Author.ID:' + message.author.id + '|' + 'Server:' + message.guild.name + ']' + ': ' + '"' + message.content + '"' + ' ' + new Date() + '\n');
	} else if (cmds.permission === 'everyone') {
		if (cmds) cmds.execute(client, message, args, Discord);
		return;
	}
};
