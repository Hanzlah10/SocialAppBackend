const mongoose = require('mongoose');
const { MONGO_CONNECTION_URL } = require('./ServerConfig')

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_CONNECTION_URL);
        console.log(`Mongo db connected: ${MONGO_CONNECTION_URL}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = { connectDB };
