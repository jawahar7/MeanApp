var express = require('express');
var bcrypt = require('bcryptjs');
var users = require('../model/users.js')
var usercontroller = {};
const saltRounds = 10;

usercontroller.findall = function(req, res) {
	users.find(function(err, data){
		if(err)
			res.send(err);
		else
			res.send(data);
	});
};

usercontroller.save = function(req, res) {		
	bcrypt.genSalt(saltRounds, function(err, salt) {
    	bcrypt.hash(req.body.password, salt, function(err, hash) {	
			if(err)
				res.send(err);
			else{
				var user = new users({username: req.body.username, password: hash, email: req.body.email});			
				user.save(function(err, data){
					if(err)
						res.send(err);
					else
						res.send('success');
				});
			}
		});
	});
};

usercontroller.login = function(req, res){		
	users.find({username: req.body.username}, function(err, user){
		if(err)			
			res.send("Error");		
		else{
			if(user.length > 0){				
				bcrypt.compare(req.body.password, user[0].password, function(err, result) {
					if(result)
						res.send('success');
					else
						res.send('Invalid Credential');
				});
			}
			else
				res.send('Invalid Credential');
		}
	});	
};

module.exports = usercontroller;