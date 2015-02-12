var Q = require('q'),
	inject = require('gulp-inject'),
	concat = require('gulp-concat'),
	order = require('gulp-order'),
	gulpMerge = require('gulp-merge'),
	sourcemaps = require('gulp-sourcemaps'),
	mainBowerFiles = require('main-bower-files'),
	sass = require('gulp-sass');

module.exports = function (gulp, options) {

	'use strict';

	gulp.task('assets', function () {
		/**
		 * Stream fonts through the build process.
		 */
		var fontStream = Q.promise(function(resolve) {
			var vendorFonts = mainBowerFiles({filter: ['**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff']}),
				applicationFonts = ['src/fonts/*.*'];

			gulp.src([].concat(vendorFonts, applicationFonts))
				.pipe(gulp.dest('build/' + options.env + '/fonts'))
				.on('end', resolve);
		});

		/**
		 * Stream css and scss through the build process.
		 */
		var cssStream = Q.promise(function (resolve) {
			var vendorCss = mainBowerFiles({filter: '**/*.css'}),
				scss = ['src/**/scss/*.scss'];

			var scssStream = gulp.src(scss)
					.pipe(sourcemaps.init())
					.pipe(sass())
					.pipe(sourcemaps.write()); // We have to write sourcemaps here or else the gulpMerge fails because the Stream is not a destroyableTransform.

			var vendorCssStream = gulp.src(vendorCss)
					.pipe(order(['**/bootstrap.css', '**/fontawesome.css','vendor/**/*.css']))
					.pipe(sourcemaps.init());

			gulpMerge(vendorCssStream, scssStream)
				.pipe(concat('app.css'))
				.pipe(sourcemaps.write())
				.pipe(gulp.dest('build/' + options.env + '/css'))
				.on('end', resolve);
		});

		/**
		 * Stream images through the build process.
		 */
		var imageStream = Q.promise(function (resolve) {
			var images = ['src/**/*.png', 'src/**/*.jpg', 'src/**/*.gif', 'src/**/*.svg'];

			gulp.src(images)
				.pipe(gulp.dest('build/' + options.env))
				.on('end', resolve);
		});


		/**
		 * Stream templates through the build process.
		 */
		var templateStream = Q.promise(function (resolve) {
			var templates = ['src/**/*.html', '!src/index.html'];

			gulp.src(templates)
				.pipe(gulp.dest('build/' + options.env))
				.on('end', resolve);
		});

		/**
		 * Stream all assets through the build process and return a promise for all of them to Gulp.
		 */
		return Q.all([fontStream, imageStream, templateStream, cssStream]);

	});
};