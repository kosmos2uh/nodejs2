  const express = require('express');
  const path = require('path');
  const logger = require('morgan');
  const favicon = require('serve-favicon');
  const expressValidator = require('express-validator');
  const cookieParser = require('cookie-parser');
  const session = require('express-session');
  const bodyParser = require('body-parser');
  const config = require('../config');
  const index = require('../routes');

  const app = express();

  // Page Rendering
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'pug');

  // Favicon
  app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));

  // Logger
  if (app.get('env') === 'development') {
    app.use(logger('dev'));
  }


  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(expressValidator());
  
  // Session
  app.use(cookieParser());

  app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    resave: true,
    saveUninitialized: true,
  }));

  // Public directory
  app.use(express.static(path.join(__dirname, '../public')));

  // Routing

  app.use('/', index);

  // Error handing
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers
  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: { },
    });
  });

module.exports = app;
