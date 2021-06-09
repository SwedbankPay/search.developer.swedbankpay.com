var createError = require('http-errors')
var express = require('express')
var fetch = require('node-fetch')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var compression = require('compression')
var helmet = require('helmet')
var searchRouter = require('./routes/search.js')

var app = express();
var __dirname = path.resolve();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "design.swedbankpay.com fonts.googleapis.com"],
      fontSrc: ["'self'", "https: data:"],
      scriptSrc: ["'self'", "design.swedbankpay.com"]
    }
  })
);
app.use(compression())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', searchRouter.search);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
