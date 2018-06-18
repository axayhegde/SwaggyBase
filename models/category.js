var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    Category_Id: {
        type: String,
        required: true,
        index: {unique: true}
    },
    Category_Name: {
        type: String
    },
});

module.exports = mongoose.model('Category', categorySchema);