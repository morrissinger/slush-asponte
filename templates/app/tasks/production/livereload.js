var livereload = require('gulp-livereload');

module.exports = function (gulp) {

	'use strict';

	gulp.task('livereload', ['scripts', 'assets', 'inject'], function () {
		return gulp.src(['build/**'])
			.pipe(livereload());
	});
};