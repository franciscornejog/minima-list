const express = require('express');
const passport = require('../auth');
const router = express.Router();
const db = require('../db');

// Show index page
router.get('/', (req, res) => res.render('index'));

// Show about page
router.get('/about', (req, res) => res.render('about'));

// Show sign up page
router.get('/signup', (req, res) => res.render('signup'));
router.post('/signup', db.createUser);

// Show login page
router.get('/login', (req, res) => res.render('login'));
router.post('/login', passport.auth);

router.get('/logout', (req, res, next) => {
    req.logout(err => next(err));
    req.flash('success', 'logged out');
    res.redirect('/');
});

module.exports = router;
