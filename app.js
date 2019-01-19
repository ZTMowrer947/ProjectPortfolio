/*///////////////////////////////////////
    app.js: Main express application.   
///////////////////////////////////////*/

// Imports
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const routes = require("./routes");
const errorHandler = require("./middleware/error");

// Paths
const faviconPath = path.join(__dirname, "favicon.ico");    // Path to favicon
const viewPath = path.join(__dirname, "views");             // Path to views
const staticAssetPath = path.join(__dirname, "public");     // Path to static assets

// Express app setup
const app = express();

// Express app configuration
app.set("view engine", "pug");  // Set Pug as view engine
app.set("views", viewPath);     // Set absolute path to view templates

// Middleware
app.use(favicon(faviconPath));                          // Serve favicon
app.use("/static", express.static(staticAssetPath));    // Setup route to static assets
app.use(routes);                                        // Setup application routes

app.use(errorHandler);                                  // Handle errors

// Express HTTP server configuration
const port = 3000;

// Express HTTP server setup
app.listen(port, () => {
    console.log(`Express server is now running on port ${port}.`);
    console.log("Press CTRL-C to stop the server at any time.");
});