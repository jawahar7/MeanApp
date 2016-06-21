var blogs = require('../model/blogs.js');
var blogcontroller = {};

blogcontroller.getblog = function(req, res){
	blogs.find({}).populate('createdby').exec(function(err, result){
		if(err)
			console.log(err);
		else
			console.log(result);
	});
};

blogcontroller.addblog = function(req, res){
	//console.log(req.body);
	// var blog = new blogs(req.body);
	// blog.save(function(err, result){
	// 	if(err)
	// 		console.log(err);
	// 	else
	// 		console.log(result);
	// });
	blogs.find({}).populate('createdby').exec(function(err, result){
		if(err)
			console.log(err);
		else
			console.log(result);
	});
	res.send('insert');
};

module.exports = blogcontroller;