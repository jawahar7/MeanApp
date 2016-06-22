var comments = require('../model/comments.js');
var blogs = require('../model/blogs.js');
var commentcontroller = {};

commentcontroller.addcomment = function(req, res){
	var comment = new comments(req.body);
	comment.save(function(err, result){
		if(err)
			res.send(err);
		else{
			blogs.findByIdAndUpdate(result._id)
			res.send(result);
		}
	});
};

module.exports = commentcontroller;