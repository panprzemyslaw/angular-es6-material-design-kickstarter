'use strict';

var gulp = require('gulp');

gulp.task('copy-to-dist', function() {
  return gulp.src(['assets/locales/**', 'assets/icons/**'], { base: 'assets'})
    .pipe(gulp.dest('../src/main/resources/static'));
});
