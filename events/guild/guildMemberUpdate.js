module.exports = (client, oldMember, newMember, message, Discord) => {
    const { supporter, moderator, admin, owner, streamerLive, verifiziert } = client.role

    if (newMember.roles.cache.has(streamerLive.plid) && newMember.roles.cache.has(streamerLive.id)) return;
    // if the user has both roles Purple Pl and Streamer Live, return

    // if goes online
    if (newMember.roles.cache.has(streamerLive.id)) {
        if (!newMember.roles.cache.has(supporter.plid) && !newMember.roles.cache.has(moderator.plid) && !newMember.roles.cache.has(admin.plid) && !newMember.roles.cache.has(owner.plid)) {
            newMember.roles.add(streamerLive.plid);
            newMember.roles.remove(verifiziert.plid);
        }
        if (newMember.roles.cache.has(supporter.plid)) {
            newMember.roles.remove(supporter.id);
        }
        if (newMember.roles.cache.has(moderator.plid)) {
            newMember.roles.remove(moderator.id);
        }
        if (newMember.roles.cache.has(admin.plid)) {
            newMember.roles.remove(admin.id);
        }
        if (newMember.roles.cache.has(owner.plid)) {
            newMember.roles.remove(owner.id);
        }
        return;
    }

    // if goes offline
    if (oldMember.roles.cache.has(streamerLive.id)&&!newMember.roles.cache.has(streamerLive.id)) {
        if (!newMember.roles.cache.has(supporter.plid) && !newMember.roles.cache.has(moderator.plid) && !newMember.roles.cache.has(admin.plid) && !newMember.roles.cache.has(owner.plid)) {
            newMember.roles.remove(streamerLive.plid);
            newMember.roles.add(verifiziert.plid);
        }

        if (newMember.roles.cache.has(supporter.plid)) {
            newMember.roles.add(supporter.id);
        }
        if (newMember.roles.cache.has(moderator.plid)) {
            newMember.roles.add(moderator.id);
        }
        if (newMember.roles.cache.has(admin.plid)) {
            newMember.roles.add(admin.id);
        }
        if (newMember.roles.cache.has(owner.plid)) {
            newMember.roles.add(owner.id);
        }
        return;
    }
};
