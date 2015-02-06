var karma = require('karma').server,
	Q = require('q');

module.exports = function (gulp, options) {

	'use strict';

	gulp.task('karma', ['build'], function () {

		var spec = Q.promise(function (resolve) {
			karma.start({
				configFile: __dirname + '/../../karma.conf.js',
				singleRun: true
			}, resolve);
		});

		var coverage = Q.promise(function (resolve) {
			karma.start({
				configFile: __dirname + '/../../karma.conf.js',
				singleRun: true,
				preprocessors: {
					'build/test/modules/**/*.js': ['coverage']
				},
				reporters: ['coverage'],
				coverageReporter: {
					// configure the reporter to use isparta for JavaScript coverage
					// Only on { "karma-coverage": "douglasduteil/karma-coverage#next" }
					instrumenters: { isparta : require('isparta') },
					instrumenter: {
						'**/*.js': 'isparta'
					},
					reporters: [
						{ type: 'html', dir: 'build', subdir: 'coverage' },
						{ type: 'text' }
					]
				}
			}, resolve);
		});

		return Q.all([spec, coverage]);

	});
};