var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
	blogheading: {type: String, require: true},
	blogcontent: {type: String, require: true},
	
})