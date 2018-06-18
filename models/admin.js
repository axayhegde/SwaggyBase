var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSchema = new Schema({
    admin_Id: {
        type: String,
        required: true,
        index: {unique: true}
    },
    Admin_Email: {
        type: String,
        require: 'Email Address is required',
    },
    Admin_Password: {
        type: String,
        require: true,
    },
    Admin_Active: {
        type: Boolean,
        require: true,
    },
});

module.exports = mongoose.model('Admin', AdminSchema);