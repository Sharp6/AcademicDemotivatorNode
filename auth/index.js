// auth/index.js
(function(auth) {

	auth.ensureAuthenticated = function(req,res,next) {
		if(req.isAuthenticated()) {
			next();
		} else {
			res.redirect("/login");
		}

	};

	auth.init = function(app) {
		var Person = require('../models/person.server.model.js');

		var computeHash = function(salt,password) {
			var crypto = require('crypto');
			var hmac = crypto.createHmac("sha1", salt);
			var hash = hmac.update(password);
			return hash.digest("hex");
		};

		var userVerify = function(username,password,next) {
			Person.findOne({name: username}, function(err,person) {
				if(!err && person) {
					var testHash = computeHash(person.salt, password);
					if(testHash === person.passwordHash) {
						next(null, person);
						return;
					}
				}
				next(null, false, { message: "Authentication failed." });
			});		
		};

		var passport = require('passport');
		var localStrategy = require('passport-local').Strategy;

		// setup passport authentication 
		passport.use(new localStrategy(userVerify));
		passport.serializeUser(function(user,next) {
			//next(null,user.name);
			next(null,user);
		});
		passport.deserializeUser(function(key,next) {
			next(null,key);
			/*Person.findOne({name:key}, function(err,user) {
				if(err)
					next(null, false, { message: "Failed to retrieve user" });
				next(null,user);
			});
			*/
		});
		app.use(passport.initialize());
		app.use(passport.session());

		app.get('/api/crypto/salt', function(req,res) {
			var crypto = require('crypto');
			var len = 8;
			res.send(crypto.randomBytes(Math.ceil(len/2)).toString('hex').substring(0,len));
		});

		app.get('/api/crypto/hash', function(req,res) {
			res.send(computeHash("3eb443ee","rabarber"));
		});

		app.get('/login', function(req,res) {
			res.render("login");
		});

/*
		app.post('/login', function(req,res,next) {
			var authFunction = passport.authenticate("local", function(err,user,info) {
				if(err)
					next(err);
				req.logIn(user, function(err) {
					if(err)
						next(err);
					res.redirect('/');
				});
			});
			authFunction(req,res,next);
		});		
*/
		app.post('/login', passport.authenticate("local"), 
			function(req,res) {
				res.redirect('/');
		});

	};
})(module.exports);