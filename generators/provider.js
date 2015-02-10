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

	gulp.task('provider', function (done) {

		if (defaults.modules.length === 0) {
			throw new Error('Provider must be created in a module, but no modules exist. Create a module first.');
		}

		var prompts = [
			{
				name: 'providerName',
				message: 'What is the name of the provider you want to create?'
			},
			{
				name: 'moduleName',
				type: 'list',
				choices: defaults.modules,
				message: 'What is the name of the module to which you want to add the provider?'
			},
			{
				name: 'injectionsRaw',
				message: 'What are the provider\'s dependencies? (Enter as comma-separated values)'
			},
			{
				name: 'methodsRaw',
				message: 'What methods should be on the provider? (Enter a comma-separated list)'
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

				answers.providerNameSlug = _.slugify(answers.providerName);
				answers.providerNameVar = _.camelize(answers.providerNameSlug)+'Provider';

				answers.injections = formatters.dependencyInjections(answers.injectionsRaw);
				answers.methods = formatters.methods(answers.methodsRaw);

				gulp.src([__dirname + '/../templates/provider/**/*.ejs'])
					.pipe(template(answers))
					.pipe(rename(utils.templateRenamer(answers.providerNameSlug)))
					.pipe(conflict('./'))
					.pipe(gulp.dest('./src/modules/' + answers.moduleNameSlug + '/providers'))
					.on('end', function () {
						done();
					});
			});
	});
};