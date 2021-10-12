module.exports = (client) => {
    const fs = require('fs');
    fs.readdirSync('./commands').forEach((dirs) => {
        const commands = fs.readdirSync(`./commands/${dirs}`).filter((files) => files.endsWith('.js'));

        for (const file of commands) {
            const command = require(`../commands/${dirs}/${file}`);
            console.log('CMD   >> ' + client.chalk.yellow(`Loading command ${file}`));
            if (dirs === 'cc') {
                client.commands.set(`c${command.name.toLowerCase()}`, command);
            } else {
                client.commands.set(command.name.toLowerCase(), command);
            }
        }
    });
};
