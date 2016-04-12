'use strict';

var gulp = require('gulp');

// copies markup to the dest folder
gulp.task('markup', function() {
  return gulp.src(['src/index.html'], { base: 'src' })
    .pipe(gulp.dest('dist'));
});
