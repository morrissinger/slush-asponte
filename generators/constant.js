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

	gulp.task('constant', function (done) {

		if (defaults.modules.length === 0) {
			throw new Error('Constants must be created in a module, but no modules exist. Create a module first.');
		}

		var prompts = [
			{
				name: 'constantName',
				message: 'What is the name of the service you want to create?'
			},
			{
				name: 'moduleName',
				type: 'list',
				choices: defaults.modules,
				message: 'What is the name of the module to which you want to add the service?'
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

				answers.constantNameSlug = _.slugify(answers.constantName);
				answers.constantNameVar = _.camelize(answers.constantNameSlug)+'Constant';

				gulp.src([__dirname + '/../templates/value/**/*.ejs'])
					.pipe(template(answers))
					.pipe(rename(utils.templateRenamer(answers.constantNameSlug)))
					.pipe(conflict('./'))
					.pipe(gulp.dest('./src/modules/' + answers.moduleNameSlug + '/values'))
					.on('end', function () {
						done();
					});
			});
	});
};