'use strict';

var gulp = require('gulp'),
  browserSync = require('browser-sync');

gulp.task('serve', ['browserify', 'css', 'markup', 'copy-to-dist', 'fixture-server'], function() {
  browserSync({
    // fixture server port
    proxy: 'localhost:3000',
    startPath: '/',
    files: 'dist'
  });
});
