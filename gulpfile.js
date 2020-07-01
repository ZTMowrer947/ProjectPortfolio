// Imports
const del = require('del');
const gulp = require('gulp');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const ts = require('gulp-typescript');

// TypeScript project setup
const tsProject = ts.createProject('tsconfig.json');

// Tasks
function build() {
    return tsProject.src().pipe(babel()).pipe(terser()).pipe(gulp.dest('dist'));
}

function clean() {
    return del(['dist']);
}

exports.default = gulp.series(clean, build);
