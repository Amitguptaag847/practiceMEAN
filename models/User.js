const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    dob: {
        type: Date
    },
    phonenumber: {
        type: String
    },
    facebook: {
        type: String
    },
    avatar: {
        type: String
    },
    new: {
        type: Boolean
    }
});

module.exports = User = mongoose.model('users', UserSchema);