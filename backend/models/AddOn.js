const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddOnSchema = new Schema({
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
})

export const AddOn = mongoose.model("AddOn", AddOnSchema);
