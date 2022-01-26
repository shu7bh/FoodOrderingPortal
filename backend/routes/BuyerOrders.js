let express = require("express");
let router = express.Router();

const BuyerOrder = require("../models/BuyerOrders");

router.post("/add", (req, res) => {
    const newOrder = new BuyerOrder({
        email: req.body.email,
        food: {
            itemName: req.body.itemName,
            quantity: req.body.quantity,
            price: req.body.price,
            addOns: req.body.addOns,
            rating: req.body.rating,
            shopName: req.body.shopName
        }
    });

    newOrder.save()
        .then(newOrder => {
            res.status(200).json(newOrder);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/getorders", (req, res) => {
    BuyerOrder.find({ email: req.body.email }).then(orders => {
        if (!orders) {
            return res.status(400).json({
                error: "Email not found",
            });
        }
        else
            return res.status(200).json(orders);
    });
})

module.exports = router;
