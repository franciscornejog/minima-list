const passport = require('passport');

authenticate = (req, res) => {
    passport.authenticate('local')(req, res, () => {
        req.flash('success', 'welcome to minima_list');
        res.redirect('/collection');
    });
}

verify = (req, res, next) => {
    if (req.user) return next();
    req.flash('error', 'please log in first');
    res.redirect('/login');
}

module.exports = {
    auth: authenticate,
    verify: verify,
};
