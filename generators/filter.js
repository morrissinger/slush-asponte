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

	gulp.task('filter', function (done) {

		if (defaults.modules.length === 0) {
			throw new Error('Filter must be created in a module, but no modules exist. Create a module first.');
		}

		var prompts = [
			{
				name: 'filterName',
				message: 'What is the name of the filter you want to create?'
			},
			{
				name: 'moduleName',
				type: 'list',
				choices: defaults.modules,
				message: 'What is the name of the module to which you want to add the filter?'
			},
			{
				name: 'injectionsRaw',
				message: 'What are the filter\'s dependencies? (Enter as comma-separated values)'
			},
			{
				name: 'methodsRaw',
				message: 'What methods should be on the filter? (Enter a comma-separated list)'
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

				answers.filterNameSlug = _.slugify(answers.filterName);
				answers.filterNameVar = _.camelize(answers.filterNameSlug)+'Filter';

				answers.injections = formatters.dependencyInjections(answers.injectionsRaw);
				answers.methods = formatters.methods(answers.methodsRaw);

				gulp.src([__dirname + '/../templates/filter/**/*.ejs'])
					.pipe(template(answers))
					.pipe(rename(utils.templateRenamer(answers.filterNameSlug)))
					.pipe(conflict('./'))
					.pipe(gulp.dest('./src/modules/' + answers.moduleNameSlug + '/filters'))
					.on('end', function () {
						done();
					});
			});
	});
};