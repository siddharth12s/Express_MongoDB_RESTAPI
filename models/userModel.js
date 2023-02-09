const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: 'string',
        required: [true, "Please enter a username"]
    },
    email: {
        type: 'string',
        required: [true, "Please enter a email address"],
        unique: [true, "Email already exists"]
    },
    password: {
        type: 'string',
        required: [true, "Please enter a password"]
    }
}, { timestamps: true })


module.exports = mongoose.model('User', userSchema);