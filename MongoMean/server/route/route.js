var express = require('express');
var path = require('path');
var usercontroller = require('../controller/user-controller')
var app = express();
var rootpath = path.join(__dirname, '../../');

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
app.post('/api/login', usercontroller.login);

module.exports = app;