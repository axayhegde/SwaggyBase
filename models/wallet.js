var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WalletSchema = new Schema({
    wallet_Id: {
        type: String,
        required: true,
        index: {unique: true}
    },
    Customer_Id: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'customer'
    },
    Amount: {
        type: Number
    },
});

module.exports = mongoose.model('Wallet', WalletSchema);