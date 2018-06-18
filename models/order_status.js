const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderStatusSchema = new Schema({
    Status: {type: String},
    Time: {type: Date}

});

module.exports = mongoose.model('Order_Status', orderStatusSchema);