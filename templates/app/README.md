#<%= appName %>

<%= appDescription %>

##Getting Started
This package uses [NPM](https://www.npmjs.org) and [Bower](https://www.bower.io) to manage
dependencies. To get started, install dependencies and [Gulp](http://gulpjs.com) to run
development tasks.


Gulp has to be installed globally:
```shell
npm install -g gulp
```

Bower has to be installed globally:
```shell
npm install -g bower
```

To get started, run:
```shell
npm install
```

The NPM install script will automatically pull in Bower dependencies. If this does not work,
for whatever reason, you can pull in Bower dependencies by running:
```shell
bower install
```

Bower dependencies are not automatically included into the WebUI client at runtime. To allow the
WebUI to include these files, you will need to do a development build or a production build.
The `npm install` script also builds the package for both development and for the test framework.


##Testing
You should run the tests through Gulp. Doing so will ensure that the test framework is automatically built before the tests run:
```shell
gulp test
```

Tests are written in [Mocha](https://www.mochajs.org), and Gulp uses
[Karma](http://karma-runner.github.io) to run the test suite. The Gulp task will also run
[JSHint](http://www.jshint.com) to ensure that all lint is removed from the source before
continuing.

###Code Coverage
Code coverage reports are generated using [Istanbul](http://gotwarlost.github.io/istanbul/), and
are generated each time you run `gulp test`. To view the coverage reports, run:
```shell
gulp test
gulp coverage
```
The coverage report will open in your browser.

##Development Builds
Similar to building for the test framework, you will need to do a development build. If you have not done an `npm install`
or have updated your Bower dependencies, you will need to rebuild:
```shell
rm -rf build/dev
gulp build --env=dev
```

###Developing
To run the app from a development build, you should use:
```
node index.js
```
If you have not previously done a development build, the software will catch this and automatically do a build before serving.
The app will be served from http://localhost:3000 by default. The application is served out of build/dev,
while you should be developing on src.

You will need to rebuild the development build to see any changes.
If you wish, you can run a watch task to monitor for changes in files on src and automatically update
the build. To start this process, you should run:
```shell
gulp watch
```

This gulp task integrates with the [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) plugin available for Chrome.

Please keep in mind the following, as you develop:

1.  Styles are provided using [SASS](http://sass-lang.com). When editing styles, please modify the SASS/SCSS
    files ONLY, and do not modify the CSS directly. Otherwise, the CSS will be overwritten the next
    time that you run a development or production build.
2.  Angular build-safing relies on [ngAnnotate](https://github.com/olov/ng-annotate).
    The settings we use for ngAnnotate allow you to specify your own annotations, which will not be
    overwritten by ngAnnotate. However, you can typically develop without worrying about build-safing,
    and the build process will take care of this for you.
3.  The Gulp task specifications are separated into one file per task. There is generally no need
    to edit the gulpfile.js directly, and by doing so, you may break the build.

##Production Builds
To test in production, you will need to do a production build.  This build is not run automatically
by `npm install`, so you will always need to do a build before you can run in production:
```shell
gulp build --env=production
```

To run the app from a production build, you should use:
```shell
node index.js --env=production
```

The app will be served from http://localhost:3000 by default.

To switch back to the development build, run:
```
node index.js
```