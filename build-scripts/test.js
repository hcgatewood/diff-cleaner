'use strict'

const path = require('path'),
    gulp = require('gulp'),
    jasmine = require('gulp-jasmine');

gulp.task('test', () => {
    return gulp.src(['**/*.spec.js'])
        .pipe(jasmine());
});

module.exports = ['test'];
