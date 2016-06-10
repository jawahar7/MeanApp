var express = require('express');
var users = require('../model/users')
var app = express();

app.get('/api/users', function(req, res){
	users.save({username: 'jawahar', password: 'jawahar123', email: 'jawahar7.ceg@gmail.com'}, function(err){
		if(err)
			console.log(err)
		else
			console.log('Inserted');
	})
	res.send('hai');
});

app.post('/api/users', function(req, res){
	
});

module.exports = app;