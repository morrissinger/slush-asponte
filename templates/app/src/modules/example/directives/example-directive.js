angular.module('example')
	.directive('scrollTo', function ($location, $anchorScroll) {
		return {
			restrict: 'A',
			scope: {
				hash: '=scrollTo'
			},
			link: function(scope, element) {
				element.on('click', function () {
					console.log(scope.hash);
					$location.hash(scope.hash);
					$anchorScroll();
				});
			}
		};
	});