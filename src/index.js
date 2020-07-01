/*
 * This script is intended for use only in development environments.
 * For production environments, please use the `start` script instead.
 */

// Register Babel to transpile TypeScript program
require('@babel/register')({
    extensions: ['.js', '.ts'],
});

// Load program
require('./index.ts');
