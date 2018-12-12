// SET UP
var method_override = require("method-override"),
    body_parser = require("body-parser"),
    mongoose = require("mongoose"),
    express_sanitizer = require("express-sanitizer"),
    express = require("express"),
    app = express();

// CONNECT TO DB
mongoose.connect("mongodb://localhost:27017/minimalist");
mongoose.set("useFindAndModify", false);

// PACKAGES
app.use(method_override("_method"));
app.use(body_parser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express_sanitizer());
app.set("view engine", "ejs");

// SCHEMA FOR ITEMS
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
    response.redirect("/index");
});
app.get("/index", function(request, response) {
    Item.find({}, function(error, items) {
        if(error) {
            console.log("Cannot find items");
        } else {
            response.render("index", {items: items});
        }
    });
});

// ABOUT PAGE
app.get("/about", function(request, response) {
    response.render("about");
});

// DEMO PAGE
app.get("/demo", function(request, response) {
    response.render("demo");
});

// LOGIN PAGE
app.get("/login", function(request, response) {
    response.render("login");
});

// SIGN UP PAGE
app.get("/signup", function(request, response) {
    response.render("signup");
});

// CONNECT TO SERVER
app.listen(3000, function() {
    console.log("Minimalist Online");
});
