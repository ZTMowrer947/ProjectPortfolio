/*///////////////////////////////////////
    app.js: Main express application.   
///////////////////////////////////////*/

// Imports
const express = require("express");
const path = require("path");
const routes = require("./routes");

// Paths
const viewPath = path.join(__dirname, "views");         // Path to views
const staticAssetPath = path.join(__dirname, "public"); // Path to static assets

// Express app setup
const app = express();

// Express app configuration
app.set("view engine", "pug");  // Set Pug as view engine
app.set("views", viewPath);     // Set absolute path to view templates

// Middleware
app.use("/static", express.static(staticAssetPath));    // Setup route to static assets
app.use(routes);                                        // Setup application routes

// Export
module.exports = app;
