var blogs = require('../model/blogs.js');
var blogcontroller = {};

blogcontroller.getblog = function(req, res){	
	blogs.find({createdby:{_id: req.params.id}}).sort({dtstamp: -1}).populate('createdby', 'username').exec(function(err, result){
		if(err){
			console.log(err);
			res.send(err)
		}
		else			
			res.send(result)
	});
};

blogcontroller.addblog = function(req, res){
	console.log(req.body);
	var blog = new blogs(req.body);
	blog.save(function(err, result){
		if(err)
			res.send(err);
		else
			res.send(result);
	});	
};

module.exports = blogcontroller;