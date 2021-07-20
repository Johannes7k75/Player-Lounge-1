module.exports = (client, oldMember, newMember, message, Discord) => {
    const supPL = '844218458861731881';
    const sup = '685178677088092205';

    const modPL = '844213940476444702';
    const mod = '685178528681164819';

    const adminPL = '848282223497052221';
    const admin = '685178501183438918';

    const ownPL = '844212307936542781';
    const own = '685176439493885996';

    console.log(newMember.roles.cache.has(sup));

    if (newMember.roles.cache.has('848282508520849438') && newMember.roles.cache.has('692086456923193346')) return;
    if (newMember.roles.cache.has('692086456923193346')) {
        // Remove lime Player-Lounge role
        client.channels.cache.get('733195953170939915').send(newMember.user.username + ' got the role <@&848282508520849438>');
        console.log(newMember.user.username + 'is live');
        if (newMember.roles.cache.has('844219922338938920')) {
            newMember.roles.remove('844219922338938920');
        }
        if (newMember.roles.cache.has(sup)) {
            newMember.roles.remove(supPL);
        }
        if (newMember.roles.cache.has(mod)) {
            newMember.roles.remove(modPL);
        }
        if (newMember.roles.cache.has(admin)) {
            newMember.roles.remove(adminPL);
        }
        if (newMember.roles.cache.has(own)) {
            newMember.roles.remove(ownPL);
        }

        // Adde purple Player-Lounge role
        newMember.roles.add('848282508520849438');
        return;
    }

    if (newMember.roles.cache.has('848282508520849438') && !newMember.roles.cache.has('848283005830955018')) {
        client.channels.cache.get('733195953170939915').send(newMember.user.username + ' got the role <@&848282508520849438> removed');
        // Remove purple Player-Lounge role
        newMember.roles.remove('848282508520849438');

        // Adde lime Player-Lounge role
        if (!newMember.roles.cache.has(sup) || !newMember.roles.cache.has(mod) || !newMember.roles.cache.has(admin) || !newMember.roles.cache.has(own)) {
            newMember.roles.add('844219922338938920');
        }

        // Add the correct team role
        if (newMember.roles.cache.has(sup)) {
            newMember.roles.add(supPL);
        }
        if (newMember.roles.cache.has(mod)) {
            newMember.roles.add(modPL);
        }
        if (newMember.roles.cache.has(admin)) {
            newMember.roles.add(adminPL);
        }
        if (newMember.roles.cache.has(own)) {
            newMember.roles.add(ownPL);
        }
        return;
    }
};
