const passport = require('passport');
const shared = require('../shared');
const config = require('../config');
const models = require('../models');

exports.login = {
	get: (req, res) => {
		if (req.isAuthenticated()) {
			return res.redirect('/');
		}

		res.render('users/login', { 
			title: 'User Login', 
			csrf: req.csrfToken() 
		});
	},
	post: (req, res, next) => {
		req.assert('email', 'Please provide a valid email address.').isEmail();
		req.assert('password', 'Password cannot be blank.').notEmpty();

		let errors = req.validationErrors();

		if (errors) {
			req.flash('errors', errors);
			return res.redirect('/users/login');
		}

		passport.authenticate('local', function(err, user, info) {
			if (err) {
				return next(err);
			}

			if (!user) {
				req.flash('errors', info);
				return res.redirect('/users/login');
			}

			req.logIn(user, (err) => {
				if (err) {
					return next(err);
				}

				res.redirect('/');
			});
		})(req, res, next);
	}
};

exports.logout = {
	get: (req, res) => {
		req.logout();
		req.flash('info', { msg: 'You have successfully logged out.' });
		res.redirect('/');
	}
};

exports.register = {
	get: (req, res) => {
		if (req.isAuthenticated()) {
			return res.redirect('/');
		}

		res.render('users/register', { title: 'Register User', minimumPasswordLength: config.login.minimumPasswordLength, csrf: req.csrfToken() });
	},
	post: (req, res, next) => {
		req.assert('email', 'Please provide a valid email address.').isEmail();
		req.assert('password', 'Please enter a password of at least ' + config.login.minimumPasswordLength + ' characters.').len(config.login.minimumPasswordLength);
		req.assert('confirmPassword', 'Your passwords must match.').equals(req.body.password);

		let errors = req.validationErrors();

		if (errors) {
			req.flash('errors', errors);
			return res.redirect('/user/register');
		}

		let verificationToken = shared.createRandomToken();
		var user = new models.User({
			email: req.body.email,
			password: req.body.password,
			verificationToken: verificationToken,
			isVerified: false
		});

		models.User.findOne({ email: req.body.email }, (err, existingUser) => {
			if (existingUser) {
				req.flash('errors', { msg: 'A user with that email address already exists.  Please try another email address.' });
				return res.redirect('/user/register');
			}

			user.save((err, newUser) => {
				if (err) {
					console.log(err);
					req.flash('errors', { msg: 'There was an error creating the user in the database.  Please try again.' });
					return res.redirect('/user/register');
				}

			});
		});
	}
};
