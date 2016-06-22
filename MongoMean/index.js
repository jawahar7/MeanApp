var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret:"this is the secret", resave: true, saveUninitialized: true, cookie: { maxAge: 15*60*1000 }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/client/build'));

require('./config/passport')(passport);
require('./server/route/route')(app, passport);

mongoose.connect('mongodb://localhost:27017/userblog', function(err){
	if(err)
		console.log(err);
	else
		console.log('connect..');
});

app.listen('3000', function(err){
	if(err)
		console.log(err);
	else
		console.log('listening...');
});