var LocalStrategy = require('passport-local').Strategy;
var users = require('../server/model/users.js')

module.exports = function(passport){
	passport.use(new LocalStrategy(function(username, password, done){				
		users.findOne({username: username}, function(err, user){				
			if(err)
				return(err)
			if(!user)
				return done(null, false);
			else{
				//delete user["password"];
				//console.log(user);
				return done(null, user);
			}
		});
	}));
	
	passport.serializeUser(function(user, done){		
		done(null, user);
	});

	passport.deserializeUser(function(user, done){			
		users.findById(user._id, function(err, user) {
            done(err, user);
        });
	});
};