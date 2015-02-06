var _ = require('underscore');

var formatters = {};

formatters._listFormatter = function (input) {
	return _.map(input.split(','), function (value) {
		return _.trim(value);
	});
}

formatters.moduleDependencies = function (input) {
	var dependencies = {
		raw: input,
		list: [],
		formatted: '[]'
	};

	if (input.length > 0) {
		dependencies.list = formatters._listFormatter(input);

		dependencies.formatted = '[' + _.map(dependencies.list, function (dependency) {
			return '\'' + dependency + '\'';
		}).join(', ') + ']';
	}

	return dependencies;
};

formatters.dependencyInjections = function (input) {
	var injections = {
		raw: input,
		list: [],
		formatted: '',
		underscored: '',
		injectorMap: ''
	};

	if (input.length > 0) {
		injections.list = formatters._listFormatter(input);
		injections.formatted = injections.list.join(', ');

		injections.underscored = _.map(injections.list, function (injection) {
			return '_' + injection + '_';
		}).join(', ');

		injections.injectorMap = _.map(injections.list, function (injection) {
			return '			' + injection + ' = _' + injection + '_;';
		}).join('\n');
	}

	return injections;
};

formatters.methods = function (input) {
	var methods = {
		raw: input,
		list: []
	};

	if (input.length > 0) {
		methods.list = formatters._listFormatter(input);
	}

	return methods;
}

module.exports = formatters;