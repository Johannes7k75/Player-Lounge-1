const mongoose = require('mongoose');

const reqString = { type: String, required: true };
const nonreqString = { type: String, required: false };
const nonreqNum = { type: Number, required: true };

const kickSchema = mongoose.Schema({
    from: nonreqNum,
    reason: nonreqString,
    date: nonreqString,
});

const banSchema = mongoose.Schema({
    from: nonreqNum,
    reason: nonreqString,
    date: nonreqString,
    removed: nonreqString,
});

const warnSchema = mongoose.Schema({
    from: nonreqNum,
    reason: nonreqString,
    date: nonreqString,
});

const muteSchema = mongoose.Schema({
    from: nonreqNum,
    reason: nonreqString,
    date: nonreqString,
    removed: nonreqString,
});

const logSchema = mongoose.Schema({
    guildId: reqString,
    userId: reqString,
    userName: reqString,
    kicks: [kickSchema],
    banishes: [banSchema],
    warnings: [warnSchema],
    mutes: [muteSchema],
});

module.exports = mongoose.model('Logs', logSchema);
