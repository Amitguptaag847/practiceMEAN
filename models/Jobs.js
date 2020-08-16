const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobsSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    companyName: {
        type: String
    },
    designation: {
        type: String,
    },
    from: {
        type: String,
    },
    to: {
        type: String
    }
});

module.exports = Jobs = mongoose.model('jobs', JobsSchema);