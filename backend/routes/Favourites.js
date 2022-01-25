let express = require("express");
let router = express.Router();

// Load Buyer model
const Favourite = require("../models/Favourites");
//const AddOn = require("../models/Addon")
//const Tag = require("../models/Tag")

// GET request
router.post("/", function(req, res) {
	const email = req.body.email;

	Favourite.findOne({ email: email }).then(favourite => {
        if (!favourite)
            return res.status(404).send({
                error: "Email not found"
            });
        else
            return res.status(200).json(favourite);
    });
});

router.post("/add", (req, res) => {
    const email = req.body.email;
    const itemName = req.body.itemName;
    const shopName = req.body.shopName;
    console.log(req.body)
	Favourite.findOne({ email: email }).then(favourite => {
        if (!favourite)
        {
            const newFavourite = new Favourite({
                email: email,
                food: [{itemName: itemName, shopName: shopName}]
            });
            newFavourite.save().then(favourite => {
                return res.status(200).json(favourite);
            });
        }
        else
        {
            if (favourite.food.some((item) => item.itemName == itemName && item.shopName == shopName))
                return res.status(200).json({
                    message: "Item already added"
                });
            favourite.food.push({itemName: itemName, shopName: shopName});
            favourite.save().then(favourite => {
                return res.status(200).json(favourite);
            });
        }
    });
});

// Remove food item from favourites
router.post("/remove", (req, res) => {
    const email = req.body.email;
    const itemName = req.body.itemName;
    const shopName = req.body.shopName;

    Favourite.findOne({ email: email }).then(favourite => {
        if (!favourite)
            return res.status(404).send({
                error: "Email not found"
            });
        else
        {
            if (!favourite.food.some((item) => item.itemName == itemName && item.shopName == shopName))
                return res.status(200).json({
                    message: "Item not found"
                });

            favourite.food = favourite.food.filter(item => item.itemName != itemName || item.shopName != shopName);
            favourite.save().then(favourite => {
                return res.status(200).json(favourite);
            });
        }
    });
});

module.exports = router;
