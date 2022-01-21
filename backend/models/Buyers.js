const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BuyerSchema = new Schema({
	name: {
		type: String,
		required: true,
        unique: true,
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
        unique: true
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
        minlength: 6,
        maxlength: 50
    }
}, {
    timestamps: true
});

module.exports = Buyers = mongoose.model("Buyers", BuyerSchema);
