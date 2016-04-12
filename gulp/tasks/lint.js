'use strict';

var gulp = require('gulp'),
  fs = require('fs'),
  eslint = require('gulp-eslint'),
  mkdirp = require('mkdirp');

gulp.task('lint', function() {
  mkdirp.sync('reports/unit/');

  return gulp.src(['src/**/*.js', 'test/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.format('junit', fs.createWriteStream('reports/unit/lint.xml')))
    .pipe(eslint.failOnError());
});
