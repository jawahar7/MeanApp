var express = require('express');
var users = require('../model/users.js')
var usercontroller = {};

usercontroller.findall = function(req, res) {
	users.find(function(err, data){
		if(err)
			res.send(err);
		else
			res.send(data);
	});
};

usercontroller.save = function(req, res) {
	var user = new users({username: 'jawahar', password: 'jawahar123', email: 'jawahar7.ceg@gmail.com'});
	user.save(function(err, data){
		if(err)
			res.send(err);
		else
			res.send(data);
	});
};

module.exports = usercontroller;