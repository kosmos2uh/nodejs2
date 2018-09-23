const express = require('express');

const app = express();
require('../middleware')(app, express);

const config = require('../config');

const port = config.get('app:port');

app.listen(port, (err) => {

  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
});
