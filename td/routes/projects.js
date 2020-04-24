/*//////////////////////////////////////////////////////////
    routes/projects.js: Project routes for application.    
//////////////////////////////////////////////////////////*/

// Imports
const express = require("express");
const { projects } = require("../data.json");

// Router setup
const router = express.Router();

// Middleware
router.param("id", (req, res, next, id) => {    // Handle "id" route param
    // Convert id to a number
    const idNum = Number(id);

    // If the id is NaN (Not a Number), then it is an error
    if (isNaN(idNum)) {
        // Create 400 error
        const error = new Error("Project ID must be a number.");
        error.status = 400; // Bad Request

        // Pass to error handlers
        return next(error);
    }

    // Otherwise, try to find project is id (there should only be one)
    const project = projects.find(project => project.id === idNum);

    // If no projects with the id were found,
    if (!project) {
        // Create 404 error
        const error = new Error(`Project not found with id "${id}.`);
        error.status = 404; // Not Found

        // Pass to error handlers
        return next(error);    
    }

    // Attach project to request
    req.project = project;

    // Pass to next handler in the chain
    next();
});

// Routes
router.get("/:id", (req, res) => {  // GET /projects/:id
    // Set locals for view
    res.locals.project = req.project // The id param middleware will provide req.project
    
    // Render project view
    res.render("project");
});

// Export
module.exports = router;
