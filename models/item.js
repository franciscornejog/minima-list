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
    },
    author:
    {
        id:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

// Schema-To-Model Conversion
module.exports = mongoose.model("Item", itemSchema);
