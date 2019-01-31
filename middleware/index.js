// Models
var Item = require("../models/item");

// Middleware Object
var middleware = {};

// Checks if User is logged in
middleware.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "please log in first");
    res.redirect("/login");
}

module.exports = middleware;
