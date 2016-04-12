'use strict';

var browserify = require('browserify'),
  watchify = require('watchify'),
  bundleLogger = require('../util/bundle-logger'),
  gulp = require('gulp'),
  gulpif = require('gulp-if'),
  uglify = require('gulp-uglify'),
  buffer = require('vinyl-buffer'),
  sourcemaps = require('gulp-sourcemaps'),
  handleErrors = require('../util/handle-errors'),
  source = require('vinyl-source-stream');

var config = {
  extensions: [],

  // A separate bundle will be generated for each
  // bundle config in the list below
  bundleConfigs: [{
    debug: true,
    entries: './src/app.js',
    dest: './../src/main/resources/static',
    outputName: 'app'
  }]
};

// gulp build --production
var production = !!require('yargs').argv.production;

gulp.task('browserify', function(callback) {

  var bundleQueue = config.bundleConfigs.length;

  var browserifyThis = function(bundleConfig) {

    var bundler = browserify({
      cache: {}, packageCache: {},
      fullPaths: false,
      entries: bundleConfig.entries,
      extensions: config.extensions,
      debug: bundleConfig.debug,
      standalone: bundleConfig.standalone
    });

    var bundle = function() {
      var applicationBundle = bundler
        .bundle()
        .on('error', handleErrors)
        .pipe(source(bundleConfig.outputName + '.js'))
        .pipe(buffer())
        .pipe(gulpif(bundleConfig.debug, sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(production, uglify({
          compress: {
            sequences: false
          }
        })))
        .pipe(gulpif(bundleConfig.debug, sourcemaps.write('./')))
        .pipe(gulp.dest(bundleConfig.dest))
        .on('end', reportFinished);

      // Log when bundling starts
      bundleLogger.start(bundleConfig.outputName);

      return applicationBundle;
    };

    if (global.isWatching) {
      bundler = watchify(bundler);
      bundler.on('update', bundle);
    }

    function reportFinished() {
      bundleLogger.end(bundleConfig.outputName);

      if (bundleQueue) {
        bundleQueue--;
        if (bundleQueue === 0) {
          // If queue is empty, tell gulp the task is complete.
          // https://github.com/gulpjs/gulp/blob/master/docs/API.md#accept-a-callback
          callback();
        }
      }
    }

    return bundle();
  };

  config.bundleConfigs.forEach(browserifyThis);
});
