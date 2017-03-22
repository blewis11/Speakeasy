var express = require('express');
var app = express();
var path = require('path');
var passport = require('passport');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
mongoose.connect('mongodb://127.0.0.1/Speakeasy');
var Mentee = require('./models/mentee');
LocalStrategy = require('passport-local').Strategy;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/////////////// to be export into another file

passport.serializeUser(function(mentee, done) {
        done(null, mentee.id);
});

passport.deserializeUser(function(id, done) {
    Mentee.findById(id, function(err, mentee) {
        done(err, mentee);
    });
});

passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
        console.log(email);
        console.log(password);
        console.log("inside passport");
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        Mentee.findOne({ 'email' :  email }, function(err, mentee) {
            // if there are any errors, return the error before anything else
            if (err)
                console.log("there has been an error");
                return done(err);

            // if no user is found, return the message
            if (!mentee)
                console.log("could not find mentee");
                return done(null, false, "no such mentee found"); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!mentee.validPassword(password))
                console.log("password invalid");
                return done(null, false, "invalid password"); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            console.log("all is good");
            return done(null, mentee);
        });

}));


///////////////

app.post('/test', function(req,res){
    console.log("body parsing", req.query);
});

app.post('/login', function(req,res,next){
    next();
});

app.post('/login', passport.authenticate('local-login', {
	successRedirect: '/main',
	failureRedirect: '/failure',
}));

var port = process.env.PORT || 8080; 

app.listen(port);
console.log("Listening from port: " + port);