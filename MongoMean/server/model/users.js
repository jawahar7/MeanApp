var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: {type: String, require: true, unique: true},
	password: {type: String, require: true},
	email: {type: String, require: true, unique: true}
});

var Users = mongoose.model('Users', userSchema);
module.exports = Users;