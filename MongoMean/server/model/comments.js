var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	comment: {type: String, require: true},	
	dtstamp: { type : Date, default: Date.now },
	commentby: { type: Schema.ObjectId, ref: 'Users', require: true }
});

var Comments = mongoose.model('Comments', commentSchema);
module.exports = Comments;