const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const async = require('async');
const config = require('../config');

const userSchema = new mongoose.Schema(
{
  email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
  
  password: {
        type: String,
        required: true
  },

  verificationToken: { 
    type: String, 
    unique: true, 
    required: true 
  },
  
  isVerified: { 
    type: Boolean, 
    required: true, 
    default: false 
  },
  
  passwordResetToken: { 
    type: String, 
    unique: true 
  },

  passwordResetExpires: Date,

  loginAttempts: { 
    type: Number, 
    required: true, 
    default: 0 
  },

  lockUntil: Date,
  
  roles: {
        type:    Array,
        default: ['user']
    },

  profile: {
        name:     String,
        gender:   String,
        zipCode:  String
    },
  
  socID: String
 
  }
);

userSchema.virtual('isLocked').get(() => {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

userSchema.virtual('url').get(function() {
      return '/admin/user/'+this._id;
});

// hash passwords
userSchema.pre('save', function(next) {
  let user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(config.login.passwordHashRounds, (err, salt) => {
    if (err) {
      console.log(err);
      req.flash('errors', { msg: 'There was an error generating your password salt.' });
      return res.redirect('/');
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        console.log(err);
        req.flash('errors', { msg: 'There was an error hashing your password.' });
        return res.redirect('/');
      }

      user.password = hash;
      next();
    });
  });
});
// Сравнение паролей
userSchema.methods.comparePassword = function(passwordToCompare, callback) {
  let user = this;

  async.waterfall([
    (waterfallCb) => {
      bcrypt.compare(passwordToCompare, user.password, (err, isMatch) => {
        if (err) {
          return waterfallCb(err);
        }

        waterfallCb(null, isMatch);
      });
    },
    (isMatch, waterfallCb) => {
      if (bcrypt.getRounds(user.password) !== config.login.passwordHashRounds) {
        user.password = passwordToCompare;

        user.save((err, user) => {
          if (err) {
            return waterfallCb(err, isMatch);
          }

          waterfallCb(null, isMatch);
        });
      }
      else {
        waterfallCb(null, isMatch);
      }
    }
  ], (err, isMatch) => {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};
// Ошибки входа
userSchema.methods.incrementLoginAttempts = function(callback) {
  let lockExpired = !!(this.lockUntil && this.lockUntil < Date.now());

  if (lockExpired) {
    return this.update({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 }
    }, callback);
  }

  let updates = { $inc: { loginAttempts: 1 } };
  let needToLock = !!(this.loginAttempts + 1 >= config.login.maxAttempts && !this.isLocked);

  if (needToLock) {
    updates.$set = { lockUntil: Date.now() + config.login.lockoutHours };
  }

  return this.update(updates, callback);
};

module.exports = mongoose.model('User', userSchema);
