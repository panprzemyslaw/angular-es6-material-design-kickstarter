'use strict';

// simple task to clean the dist directory

var gulp = require('gulp'),
    del = require('del');

gulp.task('clean', function(callback) {
  del([
    'dist/**',
    'reports/**'
  ], callback);
});
