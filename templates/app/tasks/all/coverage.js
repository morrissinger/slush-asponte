var open = require('gulp-open');

module.exports = function (gulp, options) {

	'use strict';

	gulp.task('coverage', ['build', 'karma'], function (done) {
		gulp.src('./build/coverage/index.html')
			.pipe(open());
	});
};