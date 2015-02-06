#! /usr/local/bin/node

'use strict';

var fs = require('fs'),
	Q = require('q'),
	express = require('express'),
	minimist = require('minimist'),
	chalk = require('chalk'),
	gulp = require('gulp');

var app = express(),
	options = minimist(process.argv.slice(2)),
	build = options.env || 'dev';

require('./gulpfile');

var start = function() {
	app.use(express.static(__dirname + '/build/' + build));
	app.listen(3000, function () {
		console.log(chalk.green('[<%= appName %>]') + ' Serving <%= appName %> ' + build + ' build on port 3000.');
	});
};

var checkBuild = function () {
	console.log(chalk.green('[<%= appName %>]') + ' Starting <%= appName %>  ' + build + ' build.');

	var deferred = Q.defer();

	/**
	 * If we already have a build, we don't need to do anything else.
	 */
	if (fs.existsSync('build') && fs.existsSync('build/'+build)) {
		deferred.resolve();
		return deferred.promise;
	}

	/**
	 * Use Gulp to do a build and run the server if the build completes.
	 */
	console.log(chalk.green('[<%= appName %>]') + ' No ' + build + ' build found. Attempting to do a build.');


	gulp.start('build', function (err) {
		if (err) {
			deferred.reject(err);
		} else {
			console.log(chalk.green('[<%= appName %>]') + ' Successfully built ' + build + '.');
			deferred.resolve();
		}
	});

	return deferred.promise;
};

checkBuild()
	.then(start)
	.catch(function (err) {
		console.log(chalk.green('[<%= appName %>] ') + chalk.red(err));
	})
	.done();