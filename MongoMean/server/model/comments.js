var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	comment: {type: String, require: true},	
	dtstamp: { type : Date, default: Date.now },
	createdby: { type: Schema.ObjectId, ref: 'Users', require: true }
});

var Comments = mongoose.model('Comments', commentSchema);
module.exports = Comments;