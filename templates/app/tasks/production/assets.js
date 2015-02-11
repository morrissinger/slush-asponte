var Q = require('q'),
	inject = require('gulp-inject'),
	concat = require('gulp-concat'),
	minifyCSS = require('gulp-minify-css'), // added for production
	header = require('gulp-header'), // added for production
	gulpMerge = require('gulp-merge'),
	sourcemaps = require('gulp-sourcemaps'),
	mainBowerFiles = require('main-bower-files'),
	sass = require('gulp-sass');

module.exports = function (gulp, options) {

	'use strict';

	var pkg = require('../../package.json');
	var banner = ['/**',
		' * <' + '%= pkg.name %> - <' + '%= pkg.description %> (Styles)',
		' * @version v<' + '%= pkg.version %>',
		' * @link <' + '%= pkg.homepage %>',
		' * @license <' + '%= pkg.license %>',
		' */',
		''].join('\n');

	gulp.task('assets', function () {
		/**
		 * Stream fonts through the build process.
		 */
		var fontStream = Q.Promise(function(resolve) {
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
					.pipe(sass({outputStyle: 'compressed'}))
					.pipe(header(banner, { pkg : pkg } ));

			var vendorCssStream = gulp.src(vendorCss)
					.pipe(order(['**/bootstrap.css', '**/fontawesome.css','vendor/**/*.css']))
					.pipe(minifyCSS({keepBreaks: true, keepSpecialComments: 1}))
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
		 * Stream all assets through the build process and return a promise for all of them to Gulp.
		 */
		return Q.all([fontStream, imageStream, cssStream]);

	});
};