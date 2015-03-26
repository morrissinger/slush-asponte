var install = require('gulp-install'),
	conflict = require('gulp-conflict'),
	template = require('gulp-template'),
	rename = require('gulp-rename'),
	_ = require('underscore'),
	inquirer = require('inquirer');

module.exports = function (gulp) {

	'use strict';

	_.extend(_, require('underscore.string'));

	var templatePath = function (globPattern) {
		return __dirname + '/../templates/app/' + globPattern;
	};

	gulp.task('app', function (done) {
		var prompts = [
			{
				name: 'appName',
				message: 'What is the name of your project?'
			},
			{
				name: 'appDescription',
				message: 'What is the description?'
			},
			{
				name: 'appVersion',
				message: 'What is the version of your project?',
				default: '0.1.0'
			},
			{
				name: 'authorName',
				message: 'What is the author name?'
			},
			{
				name: 'authorEmail',
				message: 'What is the author email?'
			},
			{
				name: 'userName',
				message: 'What is the github username?'
			},
			{
				type: 'list',
				name: 'license',
				message: 'Choose your license type',
				choices: ['MIT', 'BSD'],
				default: 'MIT'
			},
			{
				name: 'bootstrap',
				type: 'confirm',
				message: 'Use Bootstrap?'
			},
			{
				name: 'uiRouter',
				type: 'confirm',
				message: 'Use uiRouter?'
			},
			{
				name: 'uiSelect',
				type: 'confirm',
				message: 'Use uiSelect?'
			},
			{
				name: 'bourbon',
				type: 'confirm',
				message: 'Use Bourbon?'
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
				answers.appNameSlug = _.slugify(answers.appName);
				gulp.src(_.map(['*', '.*', '**/*', '**/.*'], templatePath))
					.pipe(template(answers))
					.pipe(conflict('./'))
					.pipe(gulp.dest('./'))
					.pipe(install())
					.on('end', function () {
						done();
					});
			});
	});
};