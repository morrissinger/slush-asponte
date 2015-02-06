var Q = require('q'),
	inject = require('gulp-inject'),
	rename = require('gulp-rename');

module.exports = function (gulp, options) {

	'use strict';

	gulp.task('inject', ['scripts', 'assets'], function () {


		var transform = function (filepath) {
			filepath = filepath.replace('/build/' + options.env + '/', '');
			return inject.transform.apply(inject.transform, [filepath]);
		};

		var indexStream = Q.promise(function (resolve) {
			var sources = gulp.src([
				'build/' + options.env + '/js/index.js',
				'build/' + options.env + '/css/app.css'], {read: false});

			gulp.src(['src/index.html'])
				.pipe(inject(sources, {transform: transform}))
				.pipe(gulp.dest('build/' + options.env))
				.on('end', resolve);
		});


		var mockStream = Q.promise(function (resolve) {
			var sources = gulp.src([
				'build/' + options.env + '/js/mock.js',
				'build/' + options.env + '/css/app.css'], {read: false});

			gulp.src(['src/index.html'])
				.pipe(rename('mock.html'))
				.pipe(inject(sources, {transform: transform}))
				.pipe(gulp.dest('build/' + options.env))
				.on('end', resolve);
		});



		return Q.all([indexStream, mockStream]);

	});
};