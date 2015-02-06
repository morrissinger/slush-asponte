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
	var streamScripts = function (vendorScripts, applicationScripts, target) {
		var deferred = Q.defer();


		var vendorStream = gulp.src(vendorScripts)
			.pipe(order(['**/underscore.js', '**/jquery.js', '**/angular.js']))
			.pipe(sourcemaps.init());

		var applicationStream = gulp.src(applicationScripts)
			.pipe(order(['modules/*/*-module.js', 'modules/**/*.js', 'js/**/*.js']))
			.pipe(sourcemaps.init())
			.pipe(to5());

		gulpMerge(vendorStream, applicationStream)
			.pipe(concat(target))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest('build/' + options.env))
			.on('end', deferred.resolve);

		return deferred.promise;
	};

	gulp.task('scripts', function () {

		var baseApplicationScripts = ['src/**/*.js', '!src/**/*-spec.js'];

		/**
		 * Stream scripts for both index.html and mock.html and return a promise for both to Gulp.
		 */
		var streams = {
			'index.js': {
				vendor: mainBowerFiles({filter: '**/*.js', includeDev: false}),
				application: baseApplicationScripts.concat(['!src/js/bootstrap-mock.js'])
			},
			'mock.js': {
				vendor: mainBowerFiles({filter: '**/*.js', includeDev: true}),
				application: baseApplicationScripts.concat(['!src/js/bootstrap.js'])
			}
		};

		return Q.all(_.map(Object.keys(streams), function (target) {
			return streamScripts(streams[target].vendor, streams[target].application, 'js/' + target);
		}));
	});
};