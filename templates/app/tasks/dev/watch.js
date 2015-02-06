var livereload = require('gulp-livereload');

module.exports = function (gulp, options) {

	'use strict';

	gulp.task('watch', function() {
		livereload.listen();

		var watcher = gulp.watch('src/**/*', ['build']);
		watcher.on('change', function (event) {
			console.log('File ' + event.path + ' was ' + event.type + ', rebuilding...');
		});
	});
};

