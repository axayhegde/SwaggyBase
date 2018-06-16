var express = require('express');
var router = express.Router();
var Customer = require('../models/customer');
var Restaurant = require('../models/restaurant');
var nodemailer = require("nodemailer");
var randomString = require('random-string');

var key = "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";


//For Registering a new Customer
router.post('/register', function (req, res) {
    var customer = new Customer();

    let nameRegex = /^[a-z ,.'-]{1,25}$/i;
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let phoneNumberRegex = /^[0-9]{10}$/;
    let addressRegex = /^[a-z 0-9,.'-]{20,300}$/i;

    customer.Customer_Id = req.body.Customer_Id;

    customer.Customer_FirstName = req.body.Customer_FirstName;

    if (!customer.Customer_FirstName.match(nameRegex)) {
        if (customer.Customer_FirstName.length > 25) throw 'first name can\'t be more than 25 characters';
        else throw 'First name invalid, no special characters allowed';
    }

    customer.Customer_LastName = req.body.Customer_LastName;
    if (!customer.Customer_LastName.match(nameRegex)) {
        if (customer.Customer_LastName.length > 25) throw 'first name can\'t be more than 25 characters';
        else throw 'Last name invalid, no special characters allowed';
    }

    customer.Customer_Email = req.body.Customer_Email;
    var email = req.body.Customer_Email;

    Customer.find({Customer_Email: customer.Customer_Email}, (err, customer) => {
        if (!err && customer.length) {
            throw 'Email already registered';
        }
    });

    customer.Customer_Phone = req.body.Customer_Phone;
    Customer.find({Customer_Phone: customer.Customer_Phone}, (err, customer) => {
        if (!err && customer.length) {
            throw 'Phone Number already registered';
        }
    });
    if (!customer.Customer_Phone.match(phoneNumberRegex)) throw 'Invalid phone number, enter 10 digits, no spaces';

    customer.Customer_Password = req.body.Customer_Password;
    customer.Customer_Address = req.body.Customer_Address;

    customer.save(function (err) {
        if (err) throw err;

        var customerToken = randomString({length: 14});
        //On Successful save, Sending out confirmation mail.
        nodemailer.createTestAccount((err, account) => {
            var transporter = nodemailer.createTransport({
                host: "mail.aadaranango.org",
                port: 587,
                secure: false,
                auth: {
                    user: "ths@aadaranango.org",
                    pass: "CVCvM?FwUzLU"
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            var mailOptions = {
                from: '"Swaggy" <swaggy@mail.com>',
                to: req.body.Customer_Email,
                subject: "Hello ✔ - You have been registered!",
                text: "Welcome ! " + req.body.Customer_Email + "! You have been registered! Please click on the link below to complete the registration",
                html: `<a href='http://localhost:3000/verifyData/${email}/${customerToken}'>Click this to verify</a>`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log("Message sent: %s", info.messageId);

                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            });
        });


        res.json({"Status": "Customer Saved"});
    });

});

//Root for test Customer

router.post('/', function (req, res) {
    res.send("test");
});

//Login Customer

router.post('/customerLogin', function (req, res) {
    console.log(req.body);
    console.log(req.body.Customer_Email);
    console.log(req.body.password);

    Customer.findOne({Customer_Email: req.body.Customer_Email}, function (err, customers) {
        if (err) {
            console.log(err);
        } else {
            console.log(customers);

            if (customers.Customer_Password == req.body.Customer_Password) {
                res.redirect('/customer/home');
            } else {
                res.send('Password did not match');
            }
            res.end();
        }
    })
});

//Home Screen for viewing all restaurants for customer

router.get('/home', function (req, res) {
    Restaurant.find({}, function (err, restaurants) {
        if (err) {
            console.log(err)
        } else {
            console.log(restaurants);
            res.json(restaurants);
            res.end();
        }
    })
});


//On selecting restaurant :restaurantId is used to find the required restaurant

router.get('/restaurantDetails/:Restaurant_Id', function (req, res) {
    Restaurant.find({Restaurant_Id: req.params.Restaurant_Id}, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.json(data);
            res.end();
        }
    })
});

//View all orders for particular customer

/*
router.get('/orderList/:Customer_Id', function (req, res) {
    Order.find({Customer_Id: req.params.Customer_Id}, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.json(data);
            res.end();
        }
    })
});
*/

//View profile

router.get('/ViewProfile/:Customer_Id', function (req, res) {
    Customer.findOne({Customer_Id: req.params.Customer_Id}, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.json(data);
            res.end();
        }
    })
});

//Edit profile

router.post('/EditProfile', function (req, res) {
    Customer.findOne({Customer_Id: req.body.Customer_Id}, function (err, customer) {
        if (err) {
            console.log(err)
        } else {
            Customer.findOneAndUpdate(function (err) {
                if (err) throw err;

                customer.Customer_Email = req.body.Customer_Email;
                customer.Customer_FirstName = req.body.Customer_FirstName;
                customer.Customer_LastName = req.body.Customer_LastName;
                customer.Customer_Phone = req.body.Customer_Phone;
                customer.Customer_Address.Address_Locality = req.body.Address_Locality;
                customer.Customer_Address.Address_City = req.body.Address_City;
                customer.Customer_Address.Address_Pincode = req.body.Address_Pincode;


                res.json(data);
                res.end();
            });
            Customer.findOneAndUpdate({Customer_Id: req.body.Customer_Id}, {
                "$set": {
                    "Customer_Email": req.body.Customer_Email,
                    "Customer_FirstName": req.body.Customer_FirstName,
                    "Customer_LastName": req.body.Customer_LastName,
                    "Customer_Phone": req.body.Customer_Phone
                }
            }).exec(function (err, customer) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    res.status(200).send(customer);
                }
            });
        }
    })
});

//Place Order
/* To place order we need customerid, restaurant id, */


//


/*//View Customer for viewing all customers

router.get('/viewCustomer', function(req, res) {
    Customer.find({}, function (err, customers) {
        if (err) {
            console.log(err)
        } else {
            console.log(customers);
            res.json(customers);
            res.end();
        }
    })
});*/


/*// TEST FOR DATA RESTAURANT DATA

router.post('/restaurantDataTest',function(req,res){
    var restaurant = new Restaurant();

    restaurant.restaurantId = req.body.restaurantId;
    restaurant.restaurantName = req.body.restaurantName;
    restaurant.restaurantEmail = req.body.restaurantEmail;
    restaurant.restaurantPhoneNumber = req.body.restaurantPhoneNumber;
    restaurant.restaurantAddress = req.body.restaurantAddress;
    restaurant.restaurantGeoLocation = req.body.restaurantGeoLocation;

    restaurant.save(function(err){
        if(err) throw err;
        res.json({"Status" : "Restaurant Saved"});
    });
});*/


module.exports = router;