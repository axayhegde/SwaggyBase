const express = require('express');
const router = require('router');
const Customer = require('../models/customer');
const Restaurant = require('../models/restaurant');
const Driver = require('../models/driver');
const Order = require('../models/order');
const nodemailer = require('nodemailer');


//Root for test Customer

router.get('/', function (req, res) {
    res.send("test");
});

//View all active orders

router.get('/viewOrders', function (req, res) {
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

//View all active Drivers
router.get('/viewActiveDrivers', function (req, res) {
    Driver.find({"Driver_Active": true}, function (err, driver) {
        if (err) {
            console.log(err)
        } else {
            res.json(driver);
            res.end();
        }
    })
});

//View all drivers
router.get('/viewAllDrivers', function (req, res) {
    Driver.find({}, function (err, driver) {
        if (err) {
            console.log(err)
        } else {
            res.json(driver);
            res.end();
        }
    })
});


//View all restaurants
router.get('/viewAllRestaurants', function (req, res) {
    Restaurant.find({}, function (err, restaurants) {
        if (err) {
            console.log(err)
        } else {
            res.json(restaurants);
            res.end();
        }
    })
});

//Assign driver to order  -- Needs to be checked. "Order_Status_ID" : "Ordered" || What are the status options.

router.post('/assignDriverToOrder', function (req, res) {
    let driver_Id = req.body.driver_Id;
    let order_Id = req.body.order_Id;


    Order.findOne({"Driver_Id": driver_Id, "Order_Id": order_Id, "Order_Status_ID": "Ordered"}, function (err, order) {
        if (err) throw err;

        Order.update(order, {$set: {Driver_Id: order_Id}}, (err, driver) => {


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
                const mailOptions = {
                    from: '"Swaggy" <swaggy@mail.com>',
                    to: driver.Driver_Email,
                    subject: "Welcome to Swaggy " + driver.Driver_Name,
                    html: "Hey " + driver.Driver_Name + ",\nOrder ID  " + order_Id + " has been assigned to you! ",
                    // html: "<b>Hello world?</b>"
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log("Message sent: %s", info.messageId);

                    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                });
            });
        })

    })
});


//Cancel an order

router.get('/cancelOrder', function (req, res) {
    var order_Id = req.body.order_Id;

    Order.findOne({"Order_Id": order_Id}, function (err, order) {
        if (err) throw err;

        Order.update(order, {$set: {"Order_Status_ID": "Cancelled"}}, (err, order) => {
            if (err) throw err;
            res.send('Order has been cancelled');
        });
    })

});

