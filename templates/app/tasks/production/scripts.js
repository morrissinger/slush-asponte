var Q = require('q'),
	_ = require('lodash'),
	to5 = require('gulp-6to5'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	order = require('gulp-order'),
	ngAnnotate = require('gulp-ng-annotate'), // added for production
	uglify = require('gulp-uglify'), // added for production
	ngtemplate = require('gulp-ngtemplate'), // added for production
	htmlmin = require('gulp-htmlmin'), // added for production
	header = require('gulp-header'), // added for production
	mainBowerFiles = require('main-bower-files'),
	gulpMerge = require('gulp-merge');

module.exports = function (gulp, options) {

	'use strict';

	/* Added for production */
	var pkg = require('../../package.json');
	var banner = ['/**',
		' * <' + '%= pkg.name %> - <' + '%= pkg.description %> (Modules)',
		' * @version v<' + '%= pkg.version %>',
		' * @link <' + '%= pkg.homepage %>',
		' * @license <' + '%= pkg.license %>',
		' */',
		''].join('\n');
	/* end */

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
			.pipe(to5())
			.pipe(ngAnnotate({ remove: true, add: true, single_quotes: true })) // added for production
			.pipe(header(banner, { pkg : pkg } )); // added for production

		/* Added for production */
		var templateStream = gulp.src(['src/modules/**/*.html'])
			.pipe(htmlmin({collapseWhitespace: true}))
			.pipe(ngtemplate({
				module: function (name) {
					return name.split('/')[0];
				}
			}));
		/* end */

		gulpMerge(vendorStream, applicationStream, templateStream)
			.pipe(concat(target))
			.pipe(uglify()) // added for production
			.pipe(sourcemaps.write())
			.pipe(gulp.dest('build/' + options.env))
			.on('end', deferred.resolve);

		return deferred.promise;
	};

	gulp.task('scripts', function () {

		var baseApplicationScripts = ['src/**/*.js', '!src/**/*-spec.js'];

		/**
		 * Stream scripts and return a promise to Gulp.
		 */
		var vendor = mainBowerFiles({filter: '**/*.js', includeDev: false}),
			application = baseApplicationScripts.concat(['!src/js/bootstrap-mock.js']);

		return streamScripts(vendor, application, 'js/index.js');
	});
};