var localStrategy = require('passport-local').Strategy;
var users = require('../server/model/users.js')
//https://scotch.io/tutorials/easy-node-authentication-setup-and-local
module.exports = function(passport){
	passport.use(new localStrategy(function(username, password, done){		
		//console.log(username,password);
		users.find({username: username}, function(err, user){	
			console.log(user)		
			if(err)
				return(err)
			if(!user)
				return done(null, false);
			else
				return done(null, user);
		});
	}));
	
	passport.serializeUser(function(user, done){
		//console.log(user)
		done(null, user);
	});

	passport.deserializeUser(function(user, done){	
		//console.log(user)	
		users.findById(user._id, function(err, user) {
            done(err, user);
        });
	});
};