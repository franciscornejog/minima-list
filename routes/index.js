// Packages
var express = require("express"),
    router  = express.Router();

// Models & Middleware
var Item = require("../models/item");

// Show Landing Page
router.get("/", function(request, response) {
    response.redirect("/landing");
});
router.get("/landing", function(request, response) {
    Item.find({}, function(error, items) {
        if(error) {
            console.log("Cannot find items");
        } else {
            response.render("landing", {items: items});
        }
    });
});

// Show About Page
// Show Register Form
router.get("/about", function(request, response) {
    response.render("about");
});

// New Register Route
router.get("/signup", function(request, response) {
    response.render("signup");
});

// Show Login Form
router.get("/login", function(request, response) {
    response.render("login");
});

// Create Login Route - Middleware

// Log Out Route

module.exports = router;
