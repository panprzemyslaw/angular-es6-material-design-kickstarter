'use strict';

var gulp = require('gulp'),
  sourcemaps = require('gulp-sourcemaps'),
  minifyCss = require('gulp-minify-css'),
  gulpif = require('gulp-if'),
  sass = require('gulp-sass');

var production = !!require('yargs').argv.production;

gulp.task('css', function() {
  return gulp.src('src/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(gulpif(production, minifyCss()))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});