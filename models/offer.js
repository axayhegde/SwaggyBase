var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var offerSchema = new Schema({
    Offer_Id: {
        type: String,
        required: true,
        index: {unique: true}
    },
    Offer_Name: {
        type: String
    },
    Offer_Date_Active_From :{
        type : String
    },
    Offer_Date_Active_To :{
        type : String
    },
    Offer_Discount_Percentage :{
        type : String
    }
});

module.exports = mongoose.model('Offer', offerSchema);