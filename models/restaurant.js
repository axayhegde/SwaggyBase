var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var restaurantSchema = new Schema({

    Restaurant_Id: {type: String, required: true, index: {unique: true}},
    Restaurant_Name: {
        type: String,
        required: true
    },
    Restaurant_Email: {
        type: String,
        required: true
    },
    Restaurant_Phone: {
        type: Number,
        required: true
    },
    Restaurant_Password: {
        type: String,
        required: true
    },
    Restaurant_Image: {
        type: String
    },
    Restaurant_Token: {
        type: String
    },
    Restaurant_Active: {
        type: Boolean,
    },
    Restaurant_Average_Delivery_Time: {
        type: String,
    },
    RestaurantTimings: [{
        day: {type: String},
        timings: {type: String}
    }],

    //Menu Items I choose this to be embedded as its a one to one relationship for every restaurant.
    Menu_Items: [{
        Menu_Id: {type: String, require: true, unique: true},
        Item_Name: {type: String, required: true},
        Description: {type: String},
        Item_Price: {type: String},
        Item_Active: {type: String},
        Restaurant_ID: {type: Schema.Types.ObjectId, ref: 'Restaurant'},
        Offer_ID: {type: Schema.Types.ObjectId, ref: 'Offer'},
        Menu_Tags: [{ type: String }], //This is for search implementation in the future. An array of tags that we can use for search
        Category_Category_ID: {type: Schema.Types.ObjectId, ref: 'Category'},
        Offer_Offer_ID: {type: Schema.Types.ObjectId, ref: 'Offer'},
    }],

});

module.exports = mongoose.model('Restaurant', restaurantSchema);