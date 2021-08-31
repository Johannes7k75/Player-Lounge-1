const { rols } = require('../../config/bot');
module.exports = {
    name: 'test',
    aliases: [],
    category: 'Dev',
    role_permissions: [rols.dev],
    utilisation: '{prefix}test',

    execute(client, message, args) {
    },
};
