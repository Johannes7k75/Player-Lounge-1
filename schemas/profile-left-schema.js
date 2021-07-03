
const mongoose = require('mongoose')
require('mongoose-type-url');

const reqString = {
    type: String,
    required: true,
}

const profileSchema = mongoose.Schema({
    guildId: reqString,
    userId: reqString,
    userName: reqString,
    onServer: reqString,
    coins: {
        type: Number,
        default: 0,
    },
    xp: {
        type: Number,
        default: 0,
    },
    totalxp: {
        type: Number,
        default: 0,
    },
    level: {
        type: Number,
        default: 1,
    },
    bgimg: {
        type: mongoose.SchemaTypes.Url,
        required: false,
    }
})

module.exports = mongoose.model('profiles-left', profileSchema)