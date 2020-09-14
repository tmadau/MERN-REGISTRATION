const { mongo } = require('mongoose');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 7,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 7,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 7,
        max: 1024 // Because I need to hash it and it might cause the string to be longer
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);