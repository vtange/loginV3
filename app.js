// dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

console.log("APP.JS")
console.log("start app")
var app = express();
//--------------------
// view engine setup
console.log("set view engine")
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//--------------------
// basic setup
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//--------------------
// server routes
console.log("loading routes")
var routes = require('./routes/index');
app.use('/', routes);
//--------------------
// session config
console.log("sess system init")
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

//--------------------
// passport config
console.log("auth system init")
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('./models/account');
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//--------------------
// mongo config
console.log("connect mongodb")
// mongoose
mongoose.connect('mongodb://localhost/passport_local_mongoose_express4');

//--------------------
// error handlers
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

console.log("export app")
module.exports = app;
