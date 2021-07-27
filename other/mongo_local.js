const mongoose = require('mongoose');
const mongoPath = require('../config/bot');

// 'mongodb+srv://localhost:27017/dicordBot?retryWrites=true&w=majority'

module.exports = async () => {
    await mongoose.connect('mongodb://Admin:501thLegion@localhost:27017/discordBot?retryWrites=true&w=majority', {
        auth: { authSource: 'admin' },
        user: 'Admin',
        pass: '501thLegion',
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    return mongoose;
};
