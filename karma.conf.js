'use strict';

var istanbul = require('browserify-istanbul');
var yargs = require('yargs');

module.exports = function(config) {
  var files = 'test/**/*.spec.js';

  if (yargs.argv.grep) {
    files = 'test/' + yargs.argv.grep + '/**/*.spec.js';
  }

  config.set({
    colors: yargs.argv.color !== false, // check for explicit false value
    files: [
      'node_modules/akamai-core/dist/akamai-core.js',
      'node_modules/angular-mocks/angular-mocks.js',
      files
    ],
    browserNoActivityTimeout: 600000,
    browserDisconnectTimeout: 600000,
    browserDisconnectTolerance: 3,
    frameworks: ['jasmine', 'browserify'],
    browsers: ['PhantomJS'],
    reporters: ['spec', 'junit', 'coverage'],
    browserify: {
      transform: [
        'babelify',
        istanbul({
          ignore: ['**/*.html', 'test/**/*.js']
        })
      ]
    },
    preprocessors: {
      'test/**/*.js': ['browserify']
    },
    junitReporter: {
      outputDir: 'reports/unit',
      outputFile: 'unit.xml',
      suite: ''
    },
    coverageReporter: {
      dir: 'reports/coverage/',
      reporters: [
        { type: 'html' },
        { type: 'cobertura' },
        { type: 'text-summary' }
      ]
    }
  });
};
