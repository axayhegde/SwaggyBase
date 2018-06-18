const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const driverSchema = new Schema({

    Driver_Name:{
        type: String,
        required: true,
        match: /^[a-z ,.'-]{1,70}$/i
    },
    Driver_Email:{
        type:String,
        required: true,
        unique:true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    Driver_Phone: {
        type: String,
        required: true,
        unique: true,
        match: /^[\-+0-9]{8,13}$/
    },
    Driver_Password: {
        type: String,
        required:true
    },
    Driver_Image: {
        type: String
    },
    Driver_Token: {
        type: String
    },
    Driver_Active: {
        type: Boolean
    },
    Driver_Status: {
        type: String   // 'online and available', 'online and not available', 'offline'
    }

});

module.exports = mongoose.model('Driver', driverSchema);