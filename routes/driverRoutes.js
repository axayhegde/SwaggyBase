const express = require('express');
const router = express.Router();
const Driver = require('../models/driver');
const Order = require('../models/order');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

router.get('/', (req, res) => {


    // get id for logged in driver (TODO)
    let loggedInDriverId = "5b2364c240a16e2fd45415ed";

    // if not logged in, redirect to login page
    if (!loggedInDriverId) {
        res.redirect('/login');
    }

    // get all orders orders
    Order.find({Driver_ID: loggedInDriverId}, (err, Orders) => {
        if (err) throw err;

        let onGoingOrder = Orders.find(order => !order.Completed);
        let pastOrders = Orders.filter(order => order.Completed);

        if (onGoingOrder) {
            res.send('<h1>Current Order: </h1>\n' + JSON.stringify(onGoingOrder) +
                '\n<h1>Past Orders:</h1>\n' + JSON.stringify(pastOrders))
        } else {
            res.send('<h1>Current Order: </h1>\n' + 'You have no active orders' +
                '\n<h1>Past Orders:</h1>\n' + JSON.stringify(pastOrders))
        }
    });

});


router.post('/login', (req, res) => {
    Driver.findOne({Driver_Email: req.body.email}, (err, driver) => {
        if (err || !driver) {
            throw 'invalid email'
        } else {
            if (bcrypt.compareSync(req.body.password, driver.Driver_Password)) {
                res.send('You have been logged in')
            }
            else throw 'Invalid password'
        }
    })
});


router.post('/register', (req, res) => {

    // for input validation
    let nameRegex = /^[a-z ,.'-]{1,70}$/i;
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let mobileNoRegex = /^[\-+0-9]{8,13}$/;

    // saving into memory
    let Driver_Name = req.body.name;
    let Driver_Email = req.body.email;
    let Driver_Phone = req.body.phone;

    // checking if inputs are valid
    if (!Driver_Name.match(nameRegex)) {
        if (Driver_Name.length > 70) throw 'name can\'t be more than 70 characters';
        else throw 'name invalid, no special characters allowed';
    }
    if (!Driver_Email.match(emailRegex)) throw 'invalid email';
    if (!Driver_Phone.match(mobileNoRegex)) throw 'invalid phone number';

    // checking if email, username and phone number is unique.
    Driver.find({Driver_Email: Driver_Email}, (err, driver) => {
        if (!err && driver.length) {
            throw 'email already registered';
        }
    });

    Driver.find({Driver_Email: Driver_Phone}, (err, driver) => {
        if (!err && driver.length) {
            throw 'mobile number already registered';
        }
    });


    // proceed with creating new driver and saving it to database.
    let driver = new Driver();
    driver.Driver_Name = Driver_Name;
    driver.Driver_Email = Driver_Email;
    driver.Driver_Password = bcrypt.hashSync(req.body.password, 10);
    driver.Driver_Phone = Driver_Phone;
    driver.Driver_Token = crypto.randomBytes(20).toString('hex');
    driver.Driver_Active = false;

    driver.save((err) => {
        if (err) throw err;

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
                html: "Hey " + driver.Driver_Name + ",\nWelcome to the Swaggy Family.\n In order to activate your account, you need to " + "\n <a href='http://149.56.251.169:3133/driver/verify/" + driver.id + "/" + driver.Driver_Token + "'> Click here to verify email </a>",
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


        res.json('You have been registered. Check your email for further instructions. ');
    })


});


router.get('/verify/:id/:token', (req, res) => {
    Driver.findOne({_id: req.params.id, Driver_Token: req.params.token}, (err, driver) => {
        if (err || !driver) {
            res.send('invalid token');
            return
        }
        else {
            Driver.update(driver, {$set: {Driver_Active: true, Driver_Token: null}}, (err, driver) => {

                res.send('Your Email Has Been Verified')

            })
        }
    })
});

module.exports = router;