const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
    IP:{
        type: String,
        unique: true,
        required: true
    },
    Country:{
        type: String,
        required: true
    },
    Region:{
        type: String,
        required: true
    },
    City:{
        type: String,
        required:true
    },
    Latitude:{
        type: String,
        required:true
    },
    Longitude:{
        type: String,
        required:true
    },
    DateTime:{
        type: String,
        default: new Date().toISOString()
    }
});
module.exports = mongoose.model('user-data', userDataSchema)