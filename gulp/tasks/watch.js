'use strict';

var gulp = require('gulp');

gulp.task('watch', ['set-watch', 'serve'], function() {
  gulp.watch(['./src/index.html', './assets/**'], ['markup', 'copy-to-dist']);
  gulp.watch('src/**/*.scss', ['css']);
});
