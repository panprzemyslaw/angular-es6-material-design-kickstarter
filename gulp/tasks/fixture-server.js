'use strict';

var gulp = require('gulp'),
  fixtureServer = require('portal-fixture-server/server'),
  path = require('path'),
  _ = require('lodash'),
  yargs = require('yargs'),

  PORT = 3000,
  LOCAL_WS_PORT = 9090,
  API_CONTEXTS = ['/quick-provisioning-api/v1', '/quick-provisioning-analytics-api/v1'],

  configBase = {
    port: PORT,
    staticPaths: {
      '/': '../src/main/resources/static',
    }
  },

  configFixtures = _.merge({
    routePath: path.resolve('fixtures')
  }, configBase),

  configProxyQA = _.merge({
    proxy: {
      enabled: true,
      contexts: API_CONTEXTS
    }
  }, configBase),

  configProxyLocal = _.merge({
    proxy: {
      enabled: true,
      https: false,
      port: LOCAL_WS_PORT,
      host: 'localhost',
      contexts: API_CONTEXTS
    }
  }, configBase);

gulp.task('fixture-server', function (done) {
  var args = yargs.argv,
    config = args.proxyQa ? configProxyQA : (args.proxyLocal ? configProxyLocal : configFixtures);

  fixtureServer.start(config);
  done();
});
