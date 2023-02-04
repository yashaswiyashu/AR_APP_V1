const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    VideoLocation:{
        type: String,
        unique: true,
        required: true
    },
    PatternLocation:{
        type: String,
        unique: true,
        required: true
    },
});
module.exports = mongoose.model('resources', resourceSchema)