var Q = require('q'),
	inject = require('gulp-inject'),
	rename = require('gulp-rename'),
	order = require('gulp-order');

module.exports = function (gulp, options) {

	'use strict';

	gulp.task('inject', ['scripts'], function () {

		var transform = function (filepath, file, i, length) {
			filepath = '.' + filepath;
			return '  "' + filepath + '"' + (i + 1 < length ? ',' : '');
		};

		var sources = gulp.src(['build/test/**/*.js'], {read: false})
			.pipe(order(['**/underscore.js', '**/chai.js', '**/chai-*.js', '**/jquery.js', '**/angular.js', '*.js', 'globals.js', 'modules/*/*-module.js', '!modules/**/*-spec.js', 'modules/**/*-spec.js']));

		return gulp.src(['build/test/index.json'])
			.pipe(inject(sources, {
				starttag: '[',
				endtag: ']',
				transform: transform
			}))
			.pipe(gulp.dest('build/' + options.env));

	});
};