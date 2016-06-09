var express = require('express');
var path = require('path');
var app = express();
var rootpath = path.join(__dirname, '../../');

app.get('/', function(req, res){
	res.sendFile(rootpath + '/client/view/index.html');
});

app.get('/blog/getblog', function(req, res){
	res.sendFile(rootpath + '/client/view/blogs/blogs.html');
});


module.exports = app;