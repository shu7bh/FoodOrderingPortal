let express = require("express");
let router = express.Router();

// Load Buyer model
const Food = require("../models/Food");
//const AddOn = require("../models/Addon")
//const Tag = require("../models/Tag")

// GET request
router.get("/", function(req, res) {
    Food.find(function(err, foodItems) {
		if (err) {
			console.log(err);
		} else {
			res.json(foodItems);
		}
	})
});

router.post("/getallfood", (req, res) => {
    Food.find({ shopName: req.body.shopName })
        .then((foodItems) => {
            if (foodItems)
                return res.status(200).json(foodItems);
            else
                return res.status(404).json({ message: "No food items found" });
        })
        .catch(err => res.status(404).json({ nofoodfound: "No food found" }))
})

// Delete food item based on item name and shop name using post
router.post("/remove", (req, res) => {
    Food.findOneAndDelete({ name: req.body.itemName, shopName: req.body.shopName })
        .then((foodItem) => {
            if (foodItem)
                return res.status(200).json({ message: "Food item deleted successfully" });
            else
                return res.status(404).json({ message: "No food item found" });
        })
        .catch(err => res.status(404).json({ nofoodfound: "No food found" }))
})

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

router.post("/update", (req, res) => {
    Food.findOne({ name: req.body.itemName, shopName: req.body.shopName })
    .then(foodItem => {
        if (foodItem) {
            foodItem.name = req.body.name;
            foodItem.price = req.body.price;
            foodItem.tags = req.body.tags;
            foodItem.addOns = req.body.addOns;
            foodItem.shopName = req.body.shopName;
            foodItem.veg = req.body.veg;
            foodItem.save()
                .then(foodItem => {
                    return res.status(200).json(foodItem);
                })
                .catch(err => {
                    return res.status(400).send(err);
                });
        } else {
            return res.status(404).json({ message: "Food item not found" });
        }
    })
    .catch(err => {
        return res.status(400).send(err);
    });
});

// Get the food item by itemName and shopName
router.post("/getdetail", (req, res) => {
    Food.findOne({ name: req.body.itemName, shopName: req.body.shopName }).then(foodItem => {
        if (!foodItem)
            return res.status(404).send({
                error: "Food item not found with name " + req.body.itemName + " and shop name " + req.body.shopName
            });
        else
            return res.status(200).json(foodItem)
    })
});

router.post("/setRate", (req, res) => {
    Food.findOne({ name: req.body.itemName, shopName: req.body.shopName })
        .then(foodItem => {
            if (!foodItem)
                return res.status(404).send({
                    error: "Food item not found with name " + req.body.itemName + " and shop name " + req.body.shopName
                });
            else {
                let rating = Number(foodItem.rating);
                rating *= Number(foodItem.ratingNumber);

                rating += Number(req.body.rate);
                foodItem.ratingNumber++;

                rating /= Number(foodItem.ratingNumber);

                foodItem.rating = rating;

                foodItem.save().then(foodItem => {
                    return res.status(200).json(foodItem)
                })
            }
    })
})

module.exports = router;
