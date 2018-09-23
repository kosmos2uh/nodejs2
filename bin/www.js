const app = require('../middleware');
const config = require('../config');
const db = require('../database/db');

db.connect(`mongodb://${config.get('mongodb:host')}:${config.get('mongodb:port')}/}`, (err) => {
  if (err) {
    console.log('Unable to connect to MongoDB.');
    process.exit(1);
  } else {
    console.log('Connected to MongoDB Successful!');
    app.listen(config.get('app:port'), config.get('app:host'), (err) => {
        if (err) {
            return console.log('something bad happened', err);
          }
        console.log(`Server running at http://${config.get('app:host')}:${config.get('app:port')}/`);
    });
  }
});
