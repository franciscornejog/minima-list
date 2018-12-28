// Packages
var method_override = require("method-override"),
    body_parser = require("body-parser"),
    mongoose = require("mongoose"),
    express_sanitizer = require("express-sanitizer"),
    express = require("express"),
    app = express();

// Models 

// Routes 

// Database Connection
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
var url = process.env.DATABASEURL || "mongodb://localhost:27017/minimalist";
mongoose.connect(url);

// Standard Setup
app.use(method_override("_method"));
app.use(body_parser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express_sanitizer());
app.set("view engine", "ejs");

// Express Setup

// Passport Setup

// Global Variables Setup

// Routes Setup

// Server Connection
var port = process.env.PORT || 3000;
var ip = process.env.IP || "";
app.listen(port, ip, function() {
    console.log("Minimalist Online");
});

// Schema for Item
var itemSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    quantity: Number,
    location: String,
    tag: String,
    notes: String,
    created: {type: Date, default: Date.now}
});
var Item = mongoose.model("Item", itemSchema);

// LANDING PAGE
app.get("/", function(request, response) {
    response.redirect("/landing");
});
app.get("/landing", function(request, response) {
    Item.find({}, function(error, items) {
        if(error) {
            console.log("Cannot find items");
        } else {
            response.render("landing", {items: items});
        }
    });
});

// ABOUT PAGE
app.get("/about", function(request, response) {
    response.render("about");
});

// DEMO PAGE
app.get("/demo", function(request, response) {
    response.render("items/demo");
});

// LOGIN PAGE
app.get("/login", function(request, response) {
    response.render("login");
});

// SIGN UP PAGE
app.get("/signup", function(request, response) {
    response.render("signup");
});

