const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const models = require('../../models');
const config = require('../../config');
const init = require('./init');


passport.use(new GitHubStrategy({
  clientID: config.github.clientID,
  clientSecret: config.github.clientSecret,
  callbackURL: config.github.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {

    let searchQuery = {
      name: profile.displayName
    };

    let updates = {
      name: profile.displayName,
      socID: profile.id
    };

    let options = {
      upsert: true
    };

    // update the user if s/he exists or add a new user
    models.User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
      if(err) {
        return done(err);
      } else {
        return done(null, user);
      }
    });
  }

));

// serialize user into the session
init();


module.exports = passport;
