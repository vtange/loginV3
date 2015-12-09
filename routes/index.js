var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
console.log("       ROUTES/INDEX.JS")
/* GET home page. */
router.get('/', function (req, res) {
    console.log("got a request for homepage")
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    console.log("got a request for register page")
    res.render('register', { });
});

router.post('/register', function(req, res) {
    console.log("package for register page")
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
          return res.render("register", {info: "Sorry. That username already exists. Try again."});
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    console.log("got a request for login page")
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    console.log("package for login page")
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    console.log("got a request for logout page")
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    console.log("send pong html text")
    res.status(200).send("pong!");
});

module.exports = router;
