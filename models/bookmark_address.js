var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookmarkAddressSchema = new Schema({
    Bookmark_Address_Id: {
        type: String,
        required: true,
        index: {unique: true}
    },
    Address_Type: {
        type: String,
    },
    Landmark: {
        type: String,
    },
    Directions: {
        type: String,
    },
    Area: {
        type: String,
    },
    City: {
        type: String,
    },
    Pincode: {
        type: Number,
    },
});

module.exports = mongoose.model('Bookmark_Address', bookmarkAddressSchema);