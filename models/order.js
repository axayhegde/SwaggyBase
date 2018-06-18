const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    Customer_ID: {type: Schema.Types.ObjectId, ref: 'Customer'},
    Driver_ID: {type: Schema.Types.ObjectId, ref: 'Driver'},
    Restaurant_ID: {type: Schema.Types.ObjectId, ref: 'Restaurant'},

    Order_Items: {type: [Object]},
    Order_Amount: {type: Number},
    Delivery_Charges: {type: Number},
    Discount: {type: Number},
    Final_Amount: {type: Number},
    Payment_Status: {type: String},

    Delivery_Address_ID: {type: Schema.Types.ObjectId, ref: 'Customer_Address'},
    Order_Status_ID: {type: Schema.Types.ObjectId, ref: 'Order_Status'},
    Payment_ID: {type: Schema.Types.ObjectId, ref: 'Payment'},

    Completed: {type: Boolean, default: false}
});


module.exports = mongoose.model('Order', orderSchema);