var Q = require('q'),
	_ = require('lodash'),
	to5 = require('gulp-6to5'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	order = require('gulp-order'),
	mainBowerFiles = require('main-bower-files'),
	gulpMerge = require('gulp-merge');

module.exports = function (gulp, options) {

	'use strict';

	/**
	 * Builds a stream that merges vendor and application scripts into a single target
	 * file, in proper order and returns a promise that resolves when the stream has
	 * ended.
	 */
	var streamScripts = function (vendorScripts, applicationScripts, configScripts) {
		var deferred = Q.defer();

		var vendorStream = gulp.src(vendorScripts)
			.pipe(sourcemaps.init());

		var applicationStream = gulp.src(applicationScripts)
			.pipe(order(['modules/*/*-module.js', 'modules/**/*.js', 'js/**/*.js']))
			.pipe(sourcemaps.init());

		var configStream = gulp.src(configScripts)
			.pipe(sourcemaps.init());

		gulpMerge(vendorStream, applicationStream, configStream)
			.pipe(gulp.dest('build/' + options.env))
			.on('end', deferred.resolve);

		return deferred.promise;
	};

	var streamTests = function (testScripts) {
		var deferred = Q.defer();

		var testStream = gulp.src(testScripts)
			.pipe(sourcemaps.init())
			//.pipe(to5())
			//.pipe(sourcemaps.write())
			.pipe(gulp.dest('build/' + options.env))
			.on('end', deferred.resolve);

		return deferred.promise;
	};

	gulp.task('scripts', function () {

		/**
		 * Stream scripts return a promise to Gulp.
		 */
		var vendor = mainBowerFiles({filter: '**/*.js', includeDev: true}),
			application = ['src/**/*.js', '!src/js/bootstrap*.js', '!src/**/*-spec.js'],
			config = ['test/*.json'],
			tests = ['test/*.js', 'src/**/*-spec.js'];

		return Q.all([streamScripts(vendor, application, config, tests), streamTests(tests)]);

	});
};