/*///////////////////////////////////////////
    index.js: Application startup point.    
///////////////////////////////////////////*/

// Imports
const app = require("./app");

// Express HTTP server configuration
const port = 3000;

// Express HTTP server setup
app.listen(port, () => {
    console.log(`Express server is now running on port ${port}.`);
    console.log("Press CTRL-C to stop the server at any time.");
});
