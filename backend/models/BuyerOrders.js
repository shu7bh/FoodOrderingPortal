const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BuyerOrderSchema = new Schema({
	email: {
		type: String,
		required: true,
        trim: true,
	},
    myStatus: {
        type: String,
        default: "Placed",
        required: true,
        trim: true
    },
    food: {
        type: {
            itemName: {
                type: String,
                required: true,
                trim: true
            },
            price: {
                type: Number,
                required: true,
                trim: true
            },
            quantity: {
                type: Number,
                required: true,
                trim: true
            },
            addOns: {
                type: [String],
                required: true,
                trim: true
            },
            rating: {
                type: Number,
                required: true,
                trim: true
            },
            shopName: {
                type: String,
                required: true,
                trim: true
            },
        }
    }
}, {
    timestamps: true
});

module.exports = BuyerOrder = mongoose.model("BuyerOrder", BuyerOrderSchema);
