// Packages
var mongoose = require("mongoose"),
    passport_local_mongoose = require("passport-local-mongoose");

// User Schema Setup
var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Passport Setup with User
userSchema.plugin(passport_local_mongoose);

// Schema-to-Model Conversion
module.exports = mongoose.model("User", userSchema);
