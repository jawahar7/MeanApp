var express = require('express');
var mongoose = require('mongoose');
var route = require('./server/route/route');
var users = require('./server/controller/user-controller');
var app = express();

//Middleware
app.use(route);
app.use(users);
app.use(express.static(__dirname + '/client/build'));

mongoose.connect('mongodb://localhost:27017/meanstack', function(err){
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