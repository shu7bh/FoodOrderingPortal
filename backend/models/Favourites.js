const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavouriteSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    food: {
        type: [{
            itemName: {
                type: String,
                required: true
            },
            shopName: {
                type: String,
                required: true
            }
        }],
        unique: true,
        required: true,
        dropDups: true
    }
})

module.exports = Favourite = mongoose.model("Favourite", FavouriteSchema);
