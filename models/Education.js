const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EducationSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    institutionName: {
        type: String
    },
    marks_cgpa: {
        type: String,
    },
    from: {
        type: String,
    },
    to: {
        type: String
    }
});

module.exports = Education = mongoose.model('education', EducationSchema);