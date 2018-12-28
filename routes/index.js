// Packages
var passport = require("passport"),
    express  = require("express"),
    router   = express.Router();

// Models & Middleware
var Item       = require("../models/item"),
    User       = require("../models/user");
var middleware = require("../middleware");

// Show Landing Page
router.get("/", function(req, res) {
    res.render("landing");
});

// Show About Page
router.get("/about", function(req, res) {
    res.render("about");
});

// Show Register Form
router.get("/signup", function(req, res) {
    res.render("signup");
});

// New Register Route
router.post("/signup", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            req.flash("error", err.message);
            return res.redirect("/signup");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "welcome to minima-list, " + user.username);
            res.redirect("/demo");
        });
    });
});

// Show Login Form
router.get("/login", function(req, res) {
    res.render("login");
});

// Create Login Route - Middleware
router.post("/login", passport.authenticate("local", {
    successRedirect: "/demo",
    failureRedirect: "/login"
}), function(req, res) {});

// Log Out Route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged out");
    res.redirect("/");
});

module.exports = router;
