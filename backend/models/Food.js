const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//const addOnSchema = new Schema({
    //name: {
        //type: String,
        //required: true
    //},
    //price: {
        //type: Number,
        //required: true
    //},
    //description: {
        //type: String,
    //}
//})

//const tagSchema = new Schema({
    //name: {
        //type: String,
        //required: true
    //}
//})

const FoodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
        required: true
    },
    image: {
        type: String,
    },
    tags: {
        type: [{
            name: {
                type: String,
                required: true
            }
        }]
    },
    addOns: {
        type: [{
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            description: {
                type: String,
            }
        }]
    }
})

module.exports = Food = mongoose.model("Food", FoodSchema);
//module.exports = AddOn = mongoose.model("AddOn", addOnSchema);
//module.exports = Tag = mongoose.model("Tag", tagSchema);
