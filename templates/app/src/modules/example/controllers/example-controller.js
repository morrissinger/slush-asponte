angular.module('example')
	.controller('exampleController', ($scope) => {
		$scope.example = {};
	});


window.foo = function () {
	return 'bar';
};