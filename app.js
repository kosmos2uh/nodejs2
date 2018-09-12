const express = require('express');
const app = express();
const port = 3000;

app.set('title', 'My Site');
const title = app.get('title');

app.get('/', (request, response) => {
  // response.send(`Hello from Express And ${title}!`);
  response.send(`Hello from Express!`);
});

app.all('/secret', (req, res, next) => {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});

app.get('/about', (req, res) => {
  res.send('about');
});

app.get('/readme', (req, res) => {
  res.send('REASME.md');
});

// маршрут сопоставляет acd и abcd.
app.get('/ab?cd', (req, res) => {
  res.send('ab?cd');
});
 // маршрут сопоставляет abcd, abbcd, abbbcd
app.get('/ab+cd', (req, res) => {
  res.send('ab+cd');
});

// маршрут сопоставляет abcd, abxcd, abRABDOMcd, ab123cd и т.д.
app.get('/ab*cd', (req, res) => {
  res.send('ab*cd');
});

// маршрут сопоставляет /abe и /abcde.
app.get('/ab(cd)?e', (req, res) => {
 res.send('ab(cd)?e');
});


app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/');
});


app.get('/example/a', function (req, res) {
  res.send('Hello from A!');
});

app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});


var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}
var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}
var cb2 = function (req, res) {
  res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);


var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}
var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}
app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!');
});

app.get(/a/, (req, res) => {
  res.send('/a/');
});


app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
});
