/*///////////////////////////////////////////
    error.js: Error-handling middleware.    
///////////////////////////////////////////*/
// Imports
const { STATUS_CODES } = require("http"); // Status code meanings

// Middleware definition/export
module.exports = (error, req, res, next) => {
    // If we have already sent headers to the client,
    if (res.headersSent) {
        // Send the error to the next error handler
        return next(error);
    }

    // Set error status to 500 if not set beforehand
    if (!error.status) {
        error.status = 500;
    }

    // Get environment
    const env = process.env.NODE_ENV || "development";

    // Set HTTP status code
    res.status(error.status);

    // Set locals for view
    res.locals.error = error;
    res.locals.env = env;

    // Get status message for status code
    const statusMessage = STATUS_CODES[error.status];

    // New line for spacing
    console.log();

    // Log error to console
    console.error(`Error ${error.status} ${statusMessage} at ${req.path}: ${error.message}`);

    // If we are in development,
    if (env === "development") {
        // Also print out the stack trace
        console.error(`Stack Trace: ${error.stack}`);
        // New line for spacing
        console.log();
    }

    // Render error view
    res.render("error");
}
