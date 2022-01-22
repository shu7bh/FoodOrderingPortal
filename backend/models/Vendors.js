const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VendorSchema = new Schema({
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
    shopName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    openingTime: {
        type: String,
        required: true,
    },
    closingTime: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    }
}, {
    timestamps: true
});

module.exports = Vendors = mongoose.model("Vendors", VendorSchema);
