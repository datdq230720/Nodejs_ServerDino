var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');

const session = require('express-session');
const mongoose = require('mongoose');
require('./components/users/model');
require('./components/admin/model');

var usersRouter = require('./routes/users');
var apisRouter = require('./routes/api');
var adminRouter = require('./routes/admin');
var productsRouter = require('./routes/product');
var authRouter = require('./routes/user/auth');
var mapAdminRouter = require('./routes/admin/map');
var characterAdminRouter = require('./routes/admin/character');
var weaponsAdminRouter = require('./routes/admin/weapons');
var monterAdminRouter = require('./routes/admin/monter');
var achievementsAdminRouter = require('./routes/admin/achievements');
var currencyConversionAdminRouter = require('./routes/admin/currency_conversion');
var hbs = require('hbs');
var app = express();

//Passport config
require('./components/users/passport')(passport)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/layout/admin');
hbs.registerPartials(__dirname + '/views/layout/admin/products');
hbs.registerPartials(__dirname + '/views/layout/admin/users');
hbs.registerPartials(__dirname + '/views/layout/admin/dashboard');
hbs.registerPartials(__dirname + '/views/layout/admin/profile');
hbs.registerPartials(__dirname + '/views/layout/admin/character');
hbs.registerPartials(__dirname + '/views/layout/admin/CurrencyConversion');
hbs.registerPartials(__dirname + '/views/layout/admin/map');
hbs.registerPartials(__dirname + '/views/layout/admin/monter');
hbs.registerPartials(__dirname + '/views/layout/admin/weapons');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'token',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 60*60000}
}));


mongoose.connect('mongodb+srv://admin:123@nhungchangtrai.hnwyobx.mongodb.net/DataDino?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));



  
app.use('/', usersRouter);
app.use('/api',apisRouter);
app.use('/admin', adminRouter);
app.use('/products', productsRouter);
app.use('/auth', authRouter);
app.use('/admin/map', mapAdminRouter);
app.use('/admin/character', characterAdminRouter);
app.use('/admin/weapons', weaponsAdminRouter);
app.use('/admin/monter', monterAdminRouter);
app.use('/admin/achievements', achievementsAdminRouter);
app.use('/admin/currency_conversion', currencyConversionAdminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//add 

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;



