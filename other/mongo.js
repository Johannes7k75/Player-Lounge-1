const mongoose = require('mongoose');
const mongoPath = require('../config/bot');

module.exports = async () => {
    await mongoose.connect(mongoPath.mongo.mongo, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    return mongoose;
};
