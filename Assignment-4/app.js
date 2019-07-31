const createError = require('http-errors');
// const cookieParser = require('cookie-parser');
const express = require('express');
const fileStorage = require('session-file-store')(session);
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');

const dishRouter = require('./routes/dishRouter');
const indexRouter = require('./routes/index');
const leaderRouter = require('./routes/leaderRouter');
const promotionRouter = require('./routes/promotionRouter');
const uploadRouter = require('./routes/uploadRouter');
const usersRouter = require('./routes/users');

const config = require('./config');
const app = express();

const connect = mongoose.connect(config.mongoUrl);

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser('12345-67890-09876-54321'));
app.use(session, {
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new fileStorage()
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

function auth (req, res, next) {
    console.log(req.user);

    if (!req.user) {
      const err = new Error('You are not authenticated!');
      err.status = 403;
      next(err);
    }
    else {
      next();
    }
};

app.use(auth);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter);
app.use('/promotions', promotionRouter);
app.use('/leaders', leaderRouter);
app.use('/imageUpload',uploadRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
