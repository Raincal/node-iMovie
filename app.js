var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
//var dbUrl = 'mongodb://localhost/iMovie';
var PORT = 80;
var port = process.env.MONGODB_PORT_27017_TCP_PORT;
var addr = process.env.MONGODB_PORT_27017_TCP_ADDR;
var instance = process.env.MONGODB_INSTANCE_NAME;
var password = process.env.MONGODB_PASSWORD;
var username = process.env.MONGODB_USERNAME;

// 'mongodb://user:pass@localhost:port/database'
var dbUrl = 'mongodb://' + username + ':' + password +'@' + addr + ':' + port + '/' + instance;
mongoose.connect(dbUrl);
var routes = require('./routes/index');
var app = express();

app.set('views', path.join(__dirname, 'app/views/pages'));
app.set('view engine', 'jade');
var moment = require('moment');
app.locals.moment = require('moment');
console.log(moment(new Date()).format('YYYY-MM-DD'));
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname + '/public')));
app.use(session({
    secret: 'imovie',
    cookie: { maxAge: 60000 * 60 },
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        url: dbUrl,
        //auto_reconnect: true,
        collection: 'sessions'
    })
}));

app.use('/', routes);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
    app.locals.pretty = true;
    mongoose.set('debug', true);
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);

module.exports = app;
