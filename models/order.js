var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    Order_Id: {
        type: String,
        required: true,
        index: {unique: true}
    },
    Customer_Id: {
        type : mongoose.Schema.Types.String,
        ref : 'customer'
    },
    Driver_Id: {
        type : mongoose.Schema.Types.String,
        ref : 'driver'
    },
    Restaurant_Id: {
        type : mongoose.Schema.Types.String,
        ref : 'restaurant'
    },
    Order_Items: [{


    }],
    Order_Amount: {
        type: Number,
    },
    Delivery_Charges: {
        type: Number,
    },
    Discount: {
        type: Number,
    },
    Final_Amount: {
        type: Number,
    },
    Payment_Status: {
        type: String,
    },
    Delivery_Address_Id: {
        type : mongoose.Schema.Types.String,
        ref : 'delivery_address'
    },
    Order_Status_Id: {
        type : mongoose.Schema.Types.String,
        ref : 'order_status'
    },
    Payment_Payment_Id: {
        type : mongoose.Schema.Types.String,
        ref : 'payment'
    },
    Ratings_Ratings_Id: {
        type : mongoose.Schema.Types.Array,
        ref : 'ratings'
    }
});

module.exports = mongoose.model('Order', orderSchema);