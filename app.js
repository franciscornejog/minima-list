// Packages
const passport_local_mongoose = require('passport-local-mongoose');
const localStrategy = require('passport-local');
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const moment = require('moment');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const expressSanitizer = require('express-sanitizer');
const express = require('express');

const app = express();

// Models
const Item = require('./models/item');
const User = require('./models/user');

// Routes
const indexRoutes = require('./routes/index');
const collectionRoutes = require('./routes/collection');

// Database Connection
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
const url = process.env.DATABASEURL || 'mongodb://localhost:27017/minimalist';
mongoose.connect(url);

// Standard Setup
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(flash());

// Express Setup
app.use(express.static('public'));
app.use(expressSanitizer());
app.use(require('express-session')({
  secret: 'some_secret',
  resave: false,
  saveUninitialized: false,
}));

// Passport Setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Global Variables Setup
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

// Routes Setup
app.use(indexRoutes);
app.use('/collection', collectionRoutes);

// Server Connection
const port = process.env.PORT || 3000;
const ip = process.env.IP || '';
app.listen(port, ip, () => {
  console.log('Minimalist Online');
});
