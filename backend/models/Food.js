const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    veg: {
        type: Boolean,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
        required: true
    },
    ratingNumber: {
        type: Number,
        default: 0,
        required: true
    },
    image: {
        type: String,
    },
    shopName: {
        type: String,
        required: true
    },
    tags: {
        type: [{
            name: {
                type: String,
                required: true
            }
        }],
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

FoodSchema.index({name: 1, shopName: 1}, {unique: true});
module.exports = Food = mongoose.model("Food", FoodSchema);
