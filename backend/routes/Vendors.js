let express = require("express");
let router = express.Router();

// Load Vendor model
const Vendor = require("../models/Vendors");

// GET request
// Getting all the users
router.get("/", function(req, res) {
    Vendor.find(function(err, users) {
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
    const newVendor = new Vendor({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        shopName: req.body.shopName,
        openingTime: req.body.openingTime,
        closingTime: req.body.closingTime,
        password: req.body.password
    });

    newVendor.save()
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
	Vendor.findOne({ email }).then(user => {
		// Check if user email exists
		if (!user) {
			return res.status(400).json({
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
    Vendor.findOne({ email: req.body.email }).then(user => {
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
    Vendor.findOne({ email: req.body.email }).then(user => {
        // Check if user email exists
        if (!user) {
            return res.status(400).json({
                error: "Email not found",
            });
        }
        else{
            user.name = req.body.name;
            user.contact = req.body.contact;
            user.password = req.body.password;
            user.shopName = req.body.shopName;
            user.openingTime = req.body.openingTime;
            user.closingTime = req.body.closingTime;
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

router.get("/getshopnames", (req, res) => {
    Vendor.find().then(vendors => {
        // Check if user email exists
        if (!vendors) {
            return res.status(400).json({
            });
        }
        else
        {
            const curDate = new Date();
            let shopNames = [];
            // Using for each, go through all vendors
            vendors.forEach(vendor => {
                const openingTime = vendor.openingTime.split(":");
                const closingTime = vendor.closingTime.split(":");

                // Check if the current date is between the opening and closing time
                if
                (
                    (
                        (
                            (curDate.getHours() > openingTime[0])
                            ||
                            (
                                curDate.getHours() == openingTime[0]
                                &&
                                curDate.getMinutes() >= openingTime[1]
                            )
                        )
                        &&
                        (
                            (curDate.getHours() < closingTime[0])
                            ||
                            (
                                curDate.getHours() == closingTime[0]
                                &&
                                curDate.getMinutes() <= closingTime[1]
                            )
                        )
                        &&
                        (
                            (openingTime[0] < closingTime[0])
                            ||
                            (
                                openingTime[0] == closingTime[0]
                                &&
                                openingTime[1] < closingTime[1]
                            )
                        )
                    )
                    ||
                    (
                        (
                            curDate.getHours() < openingTime[0]
                            ||
                            (
                                curDate.getHours() == openingTime[0]
                                &&
                                curDate.getMinutes() <= openingTime[1]
                            )
                        )
                        &&
                        (
                            (curDate.getHours() < closingTime[0])
                            ||
                            (
                                curDate.getHours() == closingTime[0]
                                &&
                                curDate.getMinutes() <= closingTime[1]
                            )
                        )
                        &&
                        (
                            (openingTime[0] > closingTime[0])
                            ||
                            (
                                openingTime[0] == closingTime[0]
                                &&
                                openingTime[1] > closingTime[1]
                            )
                        )
                    )
                    ||
                    (
                        (
                            (curDate.getHours() > openingTime[0])
                            ||
                            (
                                curDate.getHours() == openingTime[0]
                                &&
                                curDate.getMinutes() >= openingTime[1]
                            )
                        )
                        &&
                        (
                            (curDate.getHours() > closingTime[0])
                            ||
                            (
                                curDate.getHours() == closingTime[0]
                                &&
                                curDate.getMinutes() >= closingTime[1]
                            )
                        )
                        &&
                        (
                            (openingTime[0] > closingTime[0])
                            ||
                            (
                                openingTime[0] == closingTime[0]
                                &&
                                openingTime[1] > closingTime[1]
                            )
                        )
                    )
                )
                    ;
                else
                    shopNames.push(vendor.shopName);
            });
            return res.status(200).json(shopNames);
        }
    });
})

module.exports = router;
