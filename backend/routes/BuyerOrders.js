let express = require("express");
let router = express.Router();

// Load Buyer model
const BuyerOrder = require("../models/BuyerOrders");

// GET request
//router.get("/", function(req, res) {
    //Buyer.find(function(err, users) {
		//if (err) {
			//console.log(err);
		//} else {
			//res.json(users);
		//}
	//})
//});

// POST request
// Add a user to db
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

// POST request
// Login
router.post("/login", (req, res) => {
	const email = req.body.email;
    const pwd = req.body.password;
	// Find user by email
	Buyer.findOne({ email: email }).then(user => {
		// Check if user email exists
		if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }
        else if (user.password == pwd){
            return res.status(200).json(user);
        }
        else
			return res.status(401).json({
				error: pwd + " is incorrect",
			});
	});
});

router.post("/getDetails", (req, res) => {
    Buyer.findOne({ email: req.body.email }).then(user => {
        // Check if user email exists
        if (!user) {
            return res.status(400).json({
                error: "Email not found",
            });
        }
        else
            return res.status(200).json(user);
    });
})

router.post("/update", (req, res) => {
    Buyer.findOne({ email: req.body.email }).then(user => {
        // Check if user email exists
        if (!user) {
            return res.status(400).json({
                error: "Email not found",
            });
        }
        else{
            user.name = req.body.name;
            user.contact = req.body.contact;
            user.age = req.body.age;
            user.batch = req.body.batch;
            user.password = req.body.password;
            user.save()
                .then(user => {
                    return res.status(200).json(user);
                })
                .catch(err => {
                    return res.status(400).send(err);
                });
        }
    })
})

// Add a post request to get the wallet balance from the email provided

router.post("/getWallet", (req, res) => {
    Buyer.findOne({ email: req.body.email }).then(user => {
        // Check if user email exists
        if (!user) {
            return res.status(400).json({
                error: "Email not found",
            });
        }
        else
            return res.status(200).json(user);
    });
})

router.post("/setWallet", (req, res) => {
    Buyer.findOne({ email: req.body.email }).then(user => {
        // Check if user email exists
        if (!user) {
            return res.status(400).json({
                error: "Email not found",
            });
        }
        else{
            user.wallet = req.body.wallet;
            user.save()
                .then(user => {
                    return res.status(200).json(user);
                })
                .catch(err => {
                    return res.status(400).send(err);
                });
        }
    })
})

module.exports = router;
