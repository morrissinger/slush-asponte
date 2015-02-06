var jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish');

module.exports = function (gulp, options) {

	'use strict';

	gulp.task('jshint', ['build'], function () {
		return gulp.src(['src/**/*.js'])
			.pipe(jshint())
			.pipe(jshint.reporter(stylish))
			.pipe(jshint.reporter('fail'));
	});
};