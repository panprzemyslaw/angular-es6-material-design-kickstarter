# leapopt-ui

## Overview

My Portal webapp 

## Technologies Used

- [Browserify](http://browserify.org/)
- [SASS](http://sass-lang.com/)
- [Karma](karma-runner.github.io)
- [Jasmine](http://jasmine.github.io/2.2/introduction.html)
- [Istanbul](http://gotwarlost.github.io/istanbul/)
- [BrowserSync](http://browsersync.io)
- [akamai-core](https://stash.akamai.com/projects/FEE/repos/akamai-core/browse)
- [Portal Fixture Server](https://stash.akamai.com/projects/FEE/repos/fixture-server/browse)
- Error Notifications in Notification Center

## Development

### Pre-Install Steps

If you've never used Node or npm before, you'll need to install Node. If you use homebrew, do:

```
brew install node
```

Otherwise, you can download and install from [nodejs.org](http://nodejs.org/download/).

### Install Gulp

Gulp must be installed globally in order to use the command line tools. *You may need to use `sudo`*

```
npm install -g gulp
```

Alternatively, you can run the version of gulp installed local to the project instead with

```
./node_modules/.bin/gulp
```

### Install npm dependencies

```
npm install
```

This runs through all dependencies listed in `package.json` and downloads them to a `node_modules` folder in your project directory.

### Running Locally

```
gulp
```

This can also be accomplished by running `npm start`

### Building

A single build can be executed by simply running:

```
gulp build
```

The build system will generate a minified build by running:

```
gulp build --production
```

This can also be run via `npm run build`.

### Running Tests

If you want to mimic how the CI server runs tests, then you can simply run:

```
npm test
```

This will run the unit tests against PhantomJS and provide coverage reports in the `reports` directory. This is a single
run instance of Karma.

If you are in a unit testing cycle, then run:

```
gulp test --grep=DIRECTORY
```

This will spin up an instance of PhantomJS and run the unit tests against those browsers.
It will also set up a file watcher and re-run the tests whenever any of the sources or the test sources change.

The `grep` argument is optional and allows you to run just one module of unit tests. This can
considerably speed up test execution time during development.


To perform a single run of the tests against PhantomJS only run:

```
gulp test --production --grep=DIRECTORY
```