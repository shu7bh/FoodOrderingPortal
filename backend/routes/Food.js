let express = require("express");
let router = express.Router();

// Load Buyer model
const Food = require("../models/Food");
//const AddOn = require("../models/Addon")
//const Tag = require("../models/Tag")

// GET request
// Getting all the users
router.get("/", function(req, res) {
    Food.find(function(err, foodItems) {
		if (err) {
			console.log(err);
		} else {
			res.json(foodItems);
		}
	})
});

router.post("/add", (req, res) => {
    const newFood = new Food({
        name: req.body.name,
        price: req.body.price,
        rating: req.body.rating,
        tags: req.body.tags,
        addOns: req.body.addOns,
        shopName: req.body.shopName,
        veg: req.body.veg,
    });

    newFood.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

module.exports = router;
