const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompatibilitySchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    hobbies: {
        type: String
    },
    smoke: {
        type: String
    },
    place: {
        type: String
    }
});

module.exports = Compatibility = mongoose.model('compatibility', CompatibilitySchema);