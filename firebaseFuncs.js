// Imports
const path = require('path');
const { https } = require('firebase-functions');
const { default: next } = require('next');

// Next app setup
const nextApp = next({
    dev: process.env.NODE_ENV !== 'production',
    conf: {
        distDir: path.join('.', '.next'),
    },
});

const nextHandler = nextApp.getRequestHandler();

// Firebase function
module.exports.nextFunc = https.onRequest((req, res) => nextApp.prepare().then(() => nextHandler(req, res)));
