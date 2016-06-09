var blogApp = angular.module('blogApp', ['ngRoute']);

angular.module('blogApp').config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'blog/getblog',
		controller: 'blogCtrl'
	});
}]);
angular.module('blogApp').controller('blogCtrl',['$scope', function($scope){
	$scope.page = "selectblock";
	$scope.test={};
}]);