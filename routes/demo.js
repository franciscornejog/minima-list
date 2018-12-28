// Packages
var express = require("express"),
    router  = express.Router();

// Models & Middleware
var Item       = require("../models/item");
var middleware = require("../middleware");

// Show Demo Page
router.get("/", function(req, res) {
    Item.find({}, function(err, allItems) {
        if(err) {
            req.flash("error", err.message);
        } else {
            res.render("demo", {items: allItems});
        }
    });
});

// New Item Route
router.get("/new", function(req, res) {
    res.render("demo/new");
});

// Create Item Route
router.post("/", function(req, res) {
    var name = req.body.name;
    var description = req.body.description;
    var quantity = req.body.quantity;
    var notes = req.body.notes;
    var created = {

    };
    var newItem = {
        name: name,
        description: description,
        quantity: quantity,
        notes: notes,
        created: created
    };
    Item.create(newItem, function(err, newlyCreated) {
        if(err || !newlyCreated) {
            req.flash("error", err.message);
        }
        res.redirect("/demo");
    });
});

// Show Item Route
router.get("/:id", function(req, res) {
    Item.findById(req.params.id, function(err, foundItem) {
        if(err || !foundItem) {
            req.flash("error", err.message);
            res.redirect("/demo");
        } else {
            res.render("demo/show", {item: foundItem});
        }
    });
});

// Edit Item Route
router.get("/:id/edit", function(req, res) {
    Item.findById(req.params.id, function(err, foundItem) {
        if(err || !foundItem) {
            req.flash("error", err.message);
            res.redirect("/demo");
        } else {
            res.render("demo/edit", {item: foundItem});
        }
    });
});

// Update Item Route
router.put("/:id", function(req, res) {
    Item.findByIdAndUpdate(req.params.id, req.body.item, function(err, updatedItem) {
        if(err || !updatedItem) {
            req.flash("error", err.message);
            res.redirect("/demo");
        } else {
            res.redirect("/demo/" + req.params.id);
        }
    });
});

// Destroy Item Route
router.delete("/:id", function(req, res) {
    Item.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            req.flash("error", err.message);
            res.redirect("/demo");
        } else {
            req.flash("success", "Item deleted");
            res.redirect("/demo");
        }
    });
});

module.exports = router;
