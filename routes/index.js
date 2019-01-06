/*///////////////////////////////////////////////
    routes/index.js: Routes for application.    
///////////////////////////////////////////////*/

// Imports
const express = require("express");
const { projects } = require("../data.json");
const projectsRouter = require("./projects");

// Router setup
const router = express.Router();

// Route setup
router.get("/", (req, res) => { // GET /
    // Set locals for view
    res.locals.projects = projects;

    // Render view
    res.render("index");
});

router.use("/projects", projectsRouter);

// Export
module.exports = router;