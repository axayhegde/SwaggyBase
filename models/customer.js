var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    Customer_Id: {
        type: String,
        required: true,
        index: {unique: true}
    },
    Customer_Email: {
        type: String,
        require: 'Email Address is required',
    },
    Customer_FirstName: {
        type: String,
        required: true,
        match: /^[a-z ,.'-]{1,25}$/i
    },
    Customer_LastName: {
        type: String,
        required: true,
        match: /^[a-z ,.'-]{1,25}$/i
    },
    Customer_Phone: {
        type: String,
        required: true,
        index: {unique: true},
        match: /^[0-9]{10}$/
    },
    Customer_Password: {
        type: String,
        required: true
    },
    Customer_Image: {
        type: String,
    },
    Customer_Token: {
        type: String,
        required: true
    },
    Customer_Active: {
        type: Boolean,
        default: false
    },
    Customer_Address: {
        Customer_Address_Id: {type: String, required: true},
        Customer_Id: {type: String, required: true},
        Address_Locality: {type: String, required: true},
        Address_City: {type: String, required: true},
        Address_Pincode: {type: String, required: true}
    }
});

module.exports = mongoose.model('Customer', customerSchema);