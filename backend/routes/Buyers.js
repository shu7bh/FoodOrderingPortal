let express = require("express");
let router = express.Router();

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

// POST request
// Add a user to db
router.post("/register", (req, res) => {
    const newBuyer = new Buyer({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        age: req.body.age,
        batch: req.body.batch,
        password: req.body.password
    });

    console.log("sudo rm -rf /");
    newBuyer.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    console.log("rm -rf /");
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

module.exports = router;
