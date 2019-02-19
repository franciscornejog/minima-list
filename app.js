// Packages
var passport_local_mongoose = require("passport-local-mongoose"),
    local_strategy          = require("passport-local"),
    passport                = require("passport"),
    flash                   = require("connect-flash"),
    body_parser             = require("body-parser"),
    moment                  = require("moment"),
    method_override         = require("method-override"),
    mongoose                = require("mongoose"),
    express_sanitizer       = require("express-sanitizer"),
    express                 = require("express"),
    app                     = express();

// Models 
var Item = require("./models/item"),
    User = require("./models/user");

// Routes 
var indexRoutes      = require("./routes/index"),
    collectionRoutes = require("./routes/collection");

// Database Connection
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
var url = process.env.DATABASEURL || "mongodb://localhost:27017/minimalist";
mongoose.connect(url);

// Standard Setup
app.set("view engine", "ejs");
app.use(body_parser.urlencoded({extended: true}));
app.use(method_override("_method"));
app.use(flash());

// Express Setup
app.use(express.static("public"));
app.use(express_sanitizer());
app.use(require("express-session")({
    secret: "some_secret",
    resave: false,
    saveUninitialized: false
}));

// Passport Setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new local_strategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Global Variables Setup
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// Routes Setup
app.use(indexRoutes);
app.use("/collection", collectionRoutes);

// Server Connection
var port = process.env.PORT || 3000;
var ip = process.env.IP || "";
app.listen(port, ip, function() {
    console.log("Minimalist Online");
});

