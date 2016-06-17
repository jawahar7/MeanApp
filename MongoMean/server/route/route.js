var express = require('express');
var path = require('path');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var usercontroller = require('../controller/user-controller')
var app = express();
var rootpath = path.join(__dirname, '../../');

passport.use(new localStrategy(function(username, password, done){	
	console.log(usercontroller.findone(username, password))
	usercontroller.findone(username, password).then(function(user){
		console.log(user)
		if(!user)
			return done(null, false);
		else
			return done(null, user);
	},function(err){
		return done(err);
	})
}));

passport.serializeUser(function(user, done){
	done(null, user);
});

passport.deserializeUser(function(user, done){
	usercontroller.findbyid(user._id).then(function(err, user){
		done(err, user);	
	});
});

app.get('/', function(req, res){
	res.sendFile(rootpath + '/client/view/index.html');
});

app.get('/login/login', function(req, res){
	res.sendFile(rootpath + '/client/view/login/login.html');
});

app.get('/login/register', function(req, res){
	res.sendFile(rootpath + '/client/view/login/register.html');
});

app.get('/blog/getblog', function(req, res){
	res.sendFile(rootpath + '/client/view/blogs/blogs.html');
});

app.get('/api/users', usercontroller.findall);
app.post('/api/users', usercontroller.save);
app.post('/api/login', passport.authenticate("local"), usercontroller.login);

module.exports = app;