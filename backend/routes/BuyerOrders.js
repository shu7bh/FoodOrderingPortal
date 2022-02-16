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

// Update rating in buyer order table
router.post("/setrating", (req, res) => {
    BuyerOrder.findOneAndUpdate({ createdAt: req.body.createdAt, email: req.body.email }, {  $set: { "food.rating": req.body.rating } }, { new: true })
        .then(order => {
            res.status(200).json(order);
        })
        .catch(err => {
            res.status(400).send(err);
        });
})

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

router.post("/getallorders", (req, res) => {
    BuyerOrder.find().then(orders => {
        if (!orders) {
            return res.status(400).json({
                error: "No orders found",
            });
        }
        else
        {
            let allOrders = [];
            orders.forEach(order => {
                if (order.food.shopName === req.body.shopName)
                    allOrders.push(order);
            });
            return res.status(200).json(allOrders);
        }
    });
})

router.post("/updatestatus", (req, res) => {
    BuyerOrder.findOne( { email: req.body.email, createdAt: req.body.createdAt }).then((order) => {
        if (!order) {
            return res.status(400).json({
                error: "Email not found",
            });
        }
        else
        {
            let statuses = ["Placed", "Accepted", "Cooking", "Ready For Pickup", "Completed"]

            if (order.myStatus === statuses[4] || order.myStatus === "Rejected")
                return res.status(200).json({
                    error: "Order already completed",
                });
            else
            {
                let index = statuses.indexOf(order.myStatus);
                order.myStatus = statuses[index + 1];
                order.save()
                    .then(order => {
                        res.status(200).json(order);
                    })
                    .catch(err => {
                        res.status(400).send(err);
                    });
            }
        }
    });
})

router.post("/updaterejected", (req, res) => {
    BuyerOrder.findOne( { email: req.body.email, createdAt: req.body.createdAt }).then((order) => {
        if (!order) {
            return res.status(400).json({
                error: "Email not found",
            });
        }
        else
        {
            order.myStatus = "Rejected";
            order.save()
                .then(order => {
                    res.status(200).json(order);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        }
    });
})

module.exports = router;
