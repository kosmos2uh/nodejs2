const MongoClient = require('mongodb').MongoClient;
const config = require('../config');

let state = {
  db: null,
};

const dbname = config.get('mongodb:dbname');

module.exports = {

  connect: (url, done) => {
    if (state.db) return done();

    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
      if (err) return done(err);
      state.db = client.db(dbname);
      done();
    });
  },

  get: () => {
    return state.db;
  },

  close: (done) => {
    if (state.db) {
      state.db.close((err, result) => {
        state.db = null;
        state.mode = null;
        done(err);
      });
    }
  },
};