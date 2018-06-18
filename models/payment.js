var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaymentSchema = new Schema({
    Payment_Id: {
        type: String,
        required: true,
        index: {unique: true}
    },
    Payment_Type: {
        type: String
    },
    Amount: {
        type: Number
    },
});

module.exports = mongoose.model('Payment', PaymentSchema);