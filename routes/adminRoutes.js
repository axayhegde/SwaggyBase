var express = require('express');
var router = require('router');

var Customer = require('../models/customer');
var Restaurant = require('../models/restaurant');
var Driver = require('../models/driver');
var Order = require('../models/order');

var nodemailer = require("nodemailer");



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
    Driver.find({ "Driver_Active" : true}, function (err, driver) {
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

//Assign driver to order


//Cancel an order

