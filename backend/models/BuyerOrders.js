const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BuyerOrderSchema = new Schema({
	email: {
		type: String,
		required: true,
        trim: true,
        unique: true
	},
    food: {
        type: {
            name: {
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
            }

        }
    }
}, {
    timestamps: true
});

module.exports = BuyerOrder = mongoose.model("BuyerOrder", BuyerOrderSchema);
