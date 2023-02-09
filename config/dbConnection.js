const mongoose = require('mongoose');

const connectDB = async () => {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING)
    console.log('Connection established');
}

module.exports = connectDB