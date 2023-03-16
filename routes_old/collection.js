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

