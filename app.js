// Packages
var method_override = require("method-override"),
    body_parser = require("body-parser"),
    mongoose = require("mongoose"),
    express_sanitizer = require("express-sanitizer"),
    express = require("express"),
    app = express();

// Models 
var Item = require("./routes/items");

// Routes 
var itemRoutes = require("./routes/items"),
    indexRoutes = require("./routes/index");

// Database Connection
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
var url = process.env.DATABASEURL || "mongodb://localhost:27017/minimalist";
mongoose.connect(url);

// Standard Setup
app.set("view engine", "ejs");
app.use(body_parser.urlencoded({extended: true}));
app.use(method_override("_method"));

// Express Setup
app.use(express.static("public"));
app.use(express_sanitizer());

// Passport Setup

// Global Variables Setup

// Routes Setup
app.use(indexRoutes);
app.use(itemRoutes);

// Server Connection
var port = process.env.PORT || 3000;
var ip = process.env.IP || "";
app.listen(port, ip, function() {
    console.log("Minimalist Online");
});

