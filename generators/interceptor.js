var _ = require('underscore'),
	rename = require('gulp-rename'),
	template = require('gulp-template'),
	conflict = require('gulp-conflict'),
	inquirer = require('inquirer'),
	fs = require('fs'),
	utils = require('../includes/utils'),
	formatters = require('../includes/input-formatters');

module.exports = function (gulp) {

	'use strict';

	_.extend(_, require('underscore.string'));

	var defaults = (function () {
		var modules = [];

		if (fs.existsSync('./src/modules')) {
			modules = fs.readdirSync('./src/modules');
		}

		return {
			modules: modules
		};
	})();

	gulp.task('interceptor', function (done) {

		if (defaults.modules.length === 0) {
			throw new Error('Interceptor must be created in a module, but no modules exist. Create a module first.');
		}

		var prompts = [
			{
				name: 'interceptorName',
				message: 'What is the name of the interceptor you want to create?'
			},
			{
				name: 'moduleName',
				type: 'list',
				choices: defaults.modules,
				message: 'What is the name of the module to which you want to add the interceptor?'
			},
			{
				name: 'injectionsRaw',
				message: 'What are the interceptor\'s dependencies? (Enter as comma-separated values; $q is included by default if needed.)'
			},
			{
				name: 'request',
				type: 'confirm',
				message: 'Create a request interceptor?'
			},
			{
				name: 'requestError',
				type: 'confirm',
				message: 'Create a request error interceptor?'
			},
			{
				name: 'response',
				type: 'confirm',
				message: 'Create a response interceptor?'
			},
			{
				name: 'responseError',
				type: 'confirm',
				message: 'Create a response error interceptor?'
			},
			{
				type: 'confirm',
				name: 'moveon',
				message: 'Continue?'
			}
		];

		inquirer.prompt(prompts,
			function (answers) {

				if (!answers.moveon) {
					return done();
				}

				answers.moduleNameSlug = _.slugify(answers.moduleName);
				answers.moduleNameVar = _.camelize(answers.moduleNameSlug);

				answers.interceptorNameSlug = _.slugify(answers.interceptorName);
				answers.interceptorNameVar = _.camelize(answers.interceptorNameSlug)+'Interceptor';

				answers.injections = formatters.dependencyInjections(answers.injectionsRaw);

				gulp.src([__dirname + '/../templates/interceptor/**/*.ejs'])
					.pipe(template(answers))
					.pipe(rename(utils.templateRenamer(answers.interceptorNameSlug)))
					.pipe(conflict('./'))
					.pipe(gulp.dest('./src/modules/' + answers.moduleNameSlug + '/interceptors'))
					.on('end', function () {
						done();
					});
			});
	});
};