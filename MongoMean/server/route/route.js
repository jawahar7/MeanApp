var path = require('path');
var usercontroller = require('../controller/user-controller');
var blogcontroller = require('../controller/blog-controller');
var commentcontroller = require('../controller/comment-controller');
var rootpath = path.join(__dirname, '../../');

module.exports = function(app, passport){
	app.get('/', function(req, res){
		res.sendFile(rootpath + '/client/view/index.html');
	});

	app.get('/login/login', function(req, res){
		res.sendFile(rootpath + '/client/view/login/login.html');
	});

	app.get('/login/register', function(req, res){
		res.sendFile(rootpath + '/client/view/login/register.html');
	});

	app.get('/home/dashboard', function(req, res){
		res.sendFile(rootpath + '/client/view/home/dashboard.html');
	});

	app.get('/blogs/blogs', function(req, res){
		res.sendFile(rootpath + '/client/view/blogs/blogs.html');
	});

	app.get('/blogs/getblog', function(req, res){
		res.sendFile(rootpath + '/client/view/blogs/getblog.html');
	});

	//Login & Auth
	app.get('/api/users', usercontroller.findall);
	app.post('/api/users', usercontroller.save);
	app.post('/api/login', passport.authenticate("local"), usercontroller.login);
	app.get('/api/loggedin', usercontroller.isauth);
	app.get('/api/logout', usercontroller.logout);

	//Blogs
	app.get('/api/blogs/other/:id', blogcontroller.getotherblog);
	app.get('/api/blogs/user/:id', blogcontroller.getblogbyuser);
	app.get('/api/blogs/blog/:id', blogcontroller.getblogbyid);
	app.post('/api/blogs', blogcontroller.addblog);	

	//Comments
	app.post('/api/comments', commentcontroller.addcomment)
};