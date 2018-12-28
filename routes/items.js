// Packages
var express = require("express"),
    router  = express.Router();

// Models & Middleware

// Show Demo Page
router.get("/demo", function(request, response) {
    response.render("items/demo");
});

module.exports = router;
