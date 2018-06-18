const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Driver_address = new Schema({
    Driver_ID: {
        type: Schema.Types.ObjectId, ref: 'Driver'
    },
    Driver_City: {
        type: String
    },
    Driver_Locality: {
        type:String
    },
    Driver_Pincode: {
        type: String
    }
});

