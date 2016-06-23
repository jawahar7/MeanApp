var blogs = require('../model/blogs.js');
var blogcontroller = {};

blogcontroller.getotherblog = function(req, res){	
	blogs.find({createdby: { $ne: req.params.id}}).sort({dtstamp: -1}).populate('createdby', 'username').exec(function(err, result){
		if(err){
			console.log(err);
			res.send(err)
		}
		else			
			res.send(result)
	});
};

blogcontroller.getblogbyuser = function(req, res){	
	blogs.find({createdby: req.params.id}).sort({dtstamp: -1}).populate('createdby', 'username').exec(function(err, result){
		if(err){
			console.log(err);
			res.send(err)
		}
		else			
			res.send(result)
	});
};

blogcontroller.addblog = function(req, res){	
	var blog = new blogs(req.body);
	blog.save(function(err, result){
		if(err)
			res.send(err);
		else
			res.send(result);
	});	
};

blogcontroller.getblogbyid = function(req, res){
	blogs.findOne({_id: req.params.id}).populate('createdby', 'username').populate({path: 'comments',populate: {path: 'commentby'}}).exec(function(err, result){
		if(err){
			console.log(err);
			res.send(err)
		}
		else			
			res.send(result)
	});
};

module.exports = blogcontroller;