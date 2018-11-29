const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const models = require('../models');
const moment = require('moment-timezone');
const config = require('../config');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	models.User.findById(id, (err, user) => {
		done(err, user);
	});
});

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
	models.User.findOne({ email: email }, (err, user) => {
		if (!user) {
			return done(null, false, { msg: 'No user with the email ' + email + ' was found.' });
		}

		if (!user.isVerified) {
			return done(null, false, { msg: 'Your email has not been verified.  Check your inbox for a verification email.<p><a href="/user/verify-resend/' + email + '" class="btn waves-effect white black-text"><i class="material-icons left">email</i>Re-send verification email</a></p>' });
		}

		if (user.isLocked) {
			return user.incrementLoginAttempts((err) => {
				if (err) {
					return done(err);
				}

				return done(null, false, { msg: 'You have exceeded the maximum number of login attempts.  Your account is locked until ' + moment(user.lockUntil).tz(config.server.timezone).format('LT z') + '.  You may attempt to log in again after that time.' });
			});
		}

		user.comparePassword(password, (err, isMatch) => {
			if (isMatch) {
				return done(null, user);
			}
			else {
				user.incrementLoginAttempts((err) => {
					if (err) {
						return done(err);
					}

					return done(null, false, { msg: 'Invalid password.  Please try again.' });
				});
			}
		});
	});
}));

exports.isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}

	req.flash('info', { msg: "You must be logged in to visit that page." });
	res.redirect('/users/login');
};
