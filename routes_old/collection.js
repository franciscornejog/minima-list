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
