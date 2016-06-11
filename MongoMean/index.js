var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var route = require('./server/route/route');
var app = express();

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(route);
app.use(express.static(__dirname + '/client/build'));

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