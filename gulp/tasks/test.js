'use strict';

var gulp = require('gulp'),
  path = require('path'),
  Server = require('karma').Server;

var production = !!require('yargs').argv.production;

gulp.task('test', ['lint', 'sync-locale'], function(done) {
  var serve;

  if (production) {
    serve = new Server({
      configFile: path.resolve('karma.conf.js'),
      singleRun: true
    }, function(status) {
      done(status);
      process.exit(status);
    });
  } else {
    serve = new Server({
      configFile: path.resolve('karma.conf.js'),
      colors: true,
      action: 'watch'
    }, function(status) {
      done(status);
    });
  }

  serve.start();
});