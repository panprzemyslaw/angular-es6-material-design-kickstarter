'use strict';

var gulp = require('gulp');

gulp.task('build', ['lint', 'browserify', 'css', 'markup', 'copy-to-dist']);
