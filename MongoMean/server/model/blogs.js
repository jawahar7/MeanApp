var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
	blogheading: {type: String, require: true},
	blogcontent: {type: String, require: true},
	dtstamp: { type : Date, default: Date.now },
	createdby: { type: Schema.ObjectId, ref: 'Users', require: true },
	comments: [{ type: Schema.ObjectId, ref: 'Comments'}]
});

var Blogs = mongoose.model('Blogs', blogSchema);
module.exports = Blogs;