const app = require('../middleware');
const config = require('../config');

app.listen(config.get('app:port'), config.get('app:host'), (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`Server running at http://${config.get('app:host')}:${config.get('app:port')}/`);
});
