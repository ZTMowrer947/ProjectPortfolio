/*///////////////////////////////////////////////
    routes/index.js: Routes for application.    
///////////////////////////////////////////////*/

// Imports
const express = require("express");
const { projects } = require("../data.json");

// Router setup
const router = express.Router();

// Route setup
router.get("/", (req, res) => { // GET /
    // Set locals for view
    res.locals.projects = projects;

    // Render view
    res.render("index");
});

// Export
module.exports = router;