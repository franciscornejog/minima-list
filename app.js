const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser'); // read request bodies
const flash = require('connect-flash');
const path = require('path');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const methodOverride = require('method-override'); // support for HTML5 forms
const sanitizer = require('express-sanitizer');
const db = require('./db');
const app = express();

// Views Setup for ejs files as html
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html'); // use files without extension

// General Setup
app.use(express.static(path.join(__dirname, 'public'))); // find static files
app.use(bodyParser.urlencoded({ extended: true })); // read rich data in URL
app.use(flash());
app.use(methodOverride('_method')); // for forms
app.use(sanitizer());
app.use(session({
    secret: 'some_secret',
    resave: false,
    saveUninitialized: false,
}));

// Passport Setup
app.use(passport.initialize());
app.use(passport.session());
passport.use('local', new localStrategy({ passReqToCallBack: true}, (username, password, next) => {
    db.db.one('SELECT username, password FROM users WHERE username = $1', [username])
        .then(data => {
            if (password === data.password) {
                next(null, { username: data.username });
            } else {
                next(null, false);
            }
        })
        .catch(err => next(err));
}));

passport.serializeUser((user, next) => {
    next(null, user.username);
});

passport.deserializeUser((username, next) => {
    db.db.one('SELECT username FROM users where username = $1', [username])
        .then(data => next(null, data))
        .catch(err => next(err));
});

// App Middleware for local variables to render
app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

// Set up routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);
const collectionRouter = require('./routes/collection');
app.use('/collection', collectionRouter);

// Connect to server
const port = process.env.PORT || 3000;
const ip = process.env.IP || 'localhost';
app.listen(port, ip, () => {
    console.log(`Server listening at ${ip}:${port}`);
});
