var inject = require('gulp-inject')

module.exports = function (gulp, options) {

	'use strict';

	gulp.task('inject', ['scripts', 'assets'], function () {


		var transform = function (filepath) {
			filepath = filepath.replace('/build/' + options.env + '/', '');
			return inject.transform.apply(inject.transform, [filepath]);
		};

		var sources = gulp.src([
			'build/' + options.env + '/js/index.js',
			'build/' + options.env + '/css/app.css'], {read: false});

		return gulp.src(['src/index.html'])
			.pipe(gulp.dest('build/' + options.env))
			.pipe(inject(sources, {transform: transform}))
			.pipe(gulp.dest('build/' + options.env))

	});
};