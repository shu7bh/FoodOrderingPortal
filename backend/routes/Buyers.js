var express = require("express");
var router = express.Router();

// Load Buyer model
const Buyer = require("../models/Buyers");

// GET request
// Getting all the users
router.get("/", function(req, res) {
    Buyer.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request
// Add a user to db
router.post("/register", (req, res) => {
    const newBuyer = new Buyer({
        name: req.body.userName,
        email: req.body.email,
        contact: req.body.contact,
        age: req.body.age,
        batch: req.body.batch,
        password: req.body.password
    });

    newBuyer.save()
        .then(user => {
            res.status(200).json(user);
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
	Buyer.findOne({ email }).then(user => {
		// Check if user email exists
		if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }
        else if (user.password === pwd){
            res.send("Login Successful");
            return user;
        }
	});
});

module.exports = router;
