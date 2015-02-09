// Karma configuration
// Generated on Tue Nov 11 2014 15:26:47 GMT-0500 (EST)
require('source-map-support').install();

module.exports = function(config) {
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha', 'source-map-support'],


		// list of files / patterns to load in the browser
		files: require('./build/test/index.json'),


		// list of files to exclude
		exclude: [
		],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'build/test/modules/**/*.js': ['6to5']
		},

		'6to5Preprocessor': {
			options: {
				sourceMap: 'inline'
			},
			filename: function(file) {
				return file.originalPath.replace(/\.js$/, '.es5.js');
			},
			sourceFileName: function(file) {
				return file.originalPath;
			}
		},

		plugins : [
			'karma-coverage',
			'karma-source-map-support',
			'karma-mocha',
			'karma-chrome-launcher',
			'karma-spec-reporter',
			'karma-6to5-preprocessor'
		],

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['spec'],


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['Chrome'],


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false
	});
};
