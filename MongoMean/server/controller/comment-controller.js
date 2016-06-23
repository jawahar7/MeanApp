var comments = require('../model/comments.js');
var blogs = require('../model/blogs.js');
var commentcontroller = {};

commentcontroller.addcomment = function(req, res){
	var comment = new comments({comment: req.body.comment, commentby: req.body.commentby});
	comment.save(function(err, result){
		if(err)
			res.send(err);
		else{	
			console.log(result);		
			blogs.findByIdAndUpdate(req.body.blogid, {$push: {"comments": result._id}}, {new: true, safe: true, upsert: true}, function(err, updatedblog) {
        		if(err)
        			res.send(err);
        		else{
        			blogs.findOne({_id: req.body.blogid}).populate('createdby', 'username').populate({path: 'comments',populate: {path: 'commentby'}}).exec(function(err, result){
					if(err){						
						res.send(err)
					}
					else			
						res.send(result)
					});
        		}	
    		});			        		
		}
	});
};

module.exports = commentcontroller;