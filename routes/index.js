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
router.get("/", (req, res) => {         // GET /
    // Set locals for view
    res.locals.projects = projects;

    // Render index view
    res.render("index");
});

router.get("/about", (req, res) => {    // GET /about
    // Render about view
    res.render("about");
});

router.use("/projects", projectsRouter);

// All other routes are a 404
router.get("*", (req, res, next) => {
    // Create 404 error
    const error = new Error(`${req.path} currently does not exist.`);

    // Set status
    error.status = 404;

    // Pass to error handlers
    next(error);
})

// Export
module.exports = router;