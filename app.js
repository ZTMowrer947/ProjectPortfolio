/*///////////////////////////////////////
    app.js: Main express application.   
///////////////////////////////////////*/

// Imports
const express = require("express");
const path = require("path");

// Express app setup
const app = express();

// Express app configuration
app.set("view engine", "pug");                      // Set Pug as view engine
app.set("views", path.join(__dirname, "views"));    // Set absolute path to view templates

// Export
module.exports = app;
