const mongoose = require('mongoose');
const config = require('../config');

mongoose.Promise = global.Promise;

mongoose.connect(
  config.db.uri, config.db.options)
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));

module.exports = mongoose;
