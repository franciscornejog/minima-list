// Packages
var mongoose = require("mongoose");

// Item Schema Setup
var itemSchema = new mongoose.Schema({
    name: String,
    description: String,
    quantity: Number,
    notes: String,
    created: 
    {
        type: Date, 
        default: Date.now
    }
});

// Schema-To-Model Conversion
module.exports = mongoose.model("Item", itemSchema);
