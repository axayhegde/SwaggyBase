var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ratingsSchema = new Schema({
    Ratings_Id: {
        type: String,
        required: true,
        index: {unique: true}
    },
    Ratings_Value: {
        type: String
    },
    Ratings_Comments: {
        type: String
    },
    Ratings_Restaurant: {
        type: String
    },
    Ratings_Driver: {
        type: String
    },
    Customer_Customer_Id: {
        type : mongoose.Schema.Types.String,
        ref : 'customer'
    },
    Driver_Driver_Id: {
        type : mongoose.Schema.Types.String,
        ref : 'driver'
    },
    Restaurant_Restaurant_Id: {
        type : mongoose.Schema.Types.String,
        ref : 'restaurant'
    },
});

module.exports = mongoose.model('Ratings', ratingsSchema);