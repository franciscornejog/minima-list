// Packages
var moment  = require("moment"),
    express = require("express"),
    router  = express.Router();

// Models & Middleware
var Item       = require("../models/item");
var middleware = require("../middleware");

// Show Collection Page
router.get("/", middleware.isLoggedIn, function(req, res) {
    Item.find({}, function(err, allItems) {
        if(err) {
            req.flash("error", err.message);
        } else {
            res.render("collection", {items: allItems, moment: moment});
        }
    });
});

// New Item Route
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("collection/new");
});

// Create Item Route
router.post("/", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var description = req.body.description;
    var quantity = req.body.quantity;
    var notes = req.body.notes;
    var created = req.body.created;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newItem = {
        name: name,
        description: description,
        quantity: quantity,
        notes: notes,
        created: created,
        author: author
    };
    Item.create(newItem, function(err, newlyCreated) {
        if(err || !newlyCreated) {
            req.flash("error", err.message);
        }
        res.redirect("/collection");
    });
});

// Show Item Route
router.get("/:id", middleware.isLoggedIn, function(req, res) {
    Item.findById(req.params.id, function(err, foundItem) {
        if(err || !foundItem) {
            req.flash("error", err.message);
            res.redirect("/collection");
        } else {
            res.render("collection/show", {item: foundItem, moment: moment});
        }
    });
});

// Edit Item Route
router.get("/:id/edit", middleware.isLoggedIn, function(req, res) {
    Item.findById(req.params.id, function(err, foundItem) {
        if(err || !foundItem) {
            req.flash("error", err.message);
            res.redirect("/collection");
        } else {
            res.render("collection/edit", {item: foundItem});
        }
    });
});

// Reset Item Route
router.post("/:id/reset", middleware.isLoggedIn, function(req, res) {
    Item.findById(req.params.id, function(err, foundItem) {
        if(err || !foundItem) {
            req.flash("error", err.message);
            res.redirect("/collection");
        } else {
            foundItem.created = Date.now();
            foundItem.save(function(err) {
                foundItem.created = Date.now();
            });
            res.redirect("/collection");
        }
    });
});

// Update Item Route
router.put("/:id", middleware.isLoggedIn, function(req, res) {
    Item.findByIdAndUpdate(req.params.id, req.body.item, function(err, updatedItem) {
        if(err || !updatedItem) {
            req.flash("error", err.message);
            res.redirect("/collection");
        } else {
            res.redirect("/collection/" + req.params.id);
        }
    });
});

// Destroy Item Route
router.delete("/:id", middleware.isLoggedIn, function(req, res) {
    Item.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            req.flash("error", err.message);
            res.redirect("/collection");
        } else {
            req.flash("success", "item deleted");
            res.redirect("/collection");
        }
    });
});

module.exports = router;
