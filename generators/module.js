var _ = require('underscore'),
	rename = require('gulp-rename'),
	template = require('gulp-template'),
	conflict = require('gulp-conflict'),
	inquirer = require('inquirer'),
	utils = require('../includes/utils'),
	formatters = require('../includes/input-formatters');

	module.exports = function (gulp) {

	'use strict';

	_.extend(_, require('underscore.string'));

	gulp.task('module', function (done) {
		var prompts = [
			{
				name: 'moduleName',
				message: 'What is the name of the module you want to create?'
			},
			{
				name: 'dependenciesRaw',
				message: 'What are the module\'s dependencies? (Enter a comma-separated list)'
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

				answers.dependencies = formatters.moduleDependencies(answers.dependenciesRaw);

				gulp.src([__dirname + '/../templates/module/**/*.ejs'])
					.pipe(template(answers))
					.pipe(rename(utils.templateRenamer(answers.moduleNameSlug)))
					.pipe(conflict('./'))
					.pipe(gulp.dest('./src/modules/' + answers.moduleNameSlug))
					.on('end', function () {
						done();
					});
			});
	});
};