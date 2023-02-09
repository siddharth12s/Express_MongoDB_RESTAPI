const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: 'string',
        required: [true, "Please enter a name"]
    },
    email: {
        type: 'string',
        required: [true, "Please enter a email address"]
    },
    phoneNo: {
        type: 'string',
        required: [true, "Please enter a phone number"]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Contact', contactSchema);