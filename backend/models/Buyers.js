const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BuyerSchema = new Schema({
	name: {
		type: String,
		required: true,
        trim: true,
        maxlength: 50
	},
	email: {
		type: String,
		required: true,
        trim: true,
        unique: true
	},
    contact: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        trim: true
    },
    batch: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    wallet: {
        type: Number,
        required: true,
        default: 0,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = Buyers = mongoose.model("Buyers", BuyerSchema);
