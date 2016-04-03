# loginV3

# Takeaways

 - uses passport-local-mongoose for Account model (v4 only uses 'passport-local')
```
== account.js ==

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
  console.log("       MODELS/ACCT.JS")
var Account = new Schema({
    username: String,
    password: String
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);

== routes.js ==
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
/*----------------*/
/* register NEW USER. */
/*----------------*/
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
/*----------------*/
/* login USER. */
/*----------------*/
router.post('/login', passport.authenticate('local'), function(req, res) {
    console.log("package for login page")
    res.redirect('/');
});

```

 - Mocha tests for testing Account creation == https://github.com/vtange/loginV3/blob/master/test/test.user.js
 - layout.jade == header for Jade template
 
