var blogApp = angular.module('blogApp', ['ngRoute']);

angular.module('blogApp').config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'login/login',
		controller: 'loginCtrl'
	});
	$routeProvider.when('/Login', {
		templateUrl: 'login/login',
		controller: 'loginCtrl'
	});
	$routeProvider.when('/Register', {
		templateUrl: 'login/register',
		controller: 'registerCtrl'
	});
	$routeProvider.when('/Blog', {
		templateUrl: 'blog/getblog',
		controller: 'blogCtrl'
	});
}]);
angular.module('blogApp').factory('blogservice', ['$http', function($http){
	var service = {};
	service.userregister = function(obj){
		return $http.post('/api/users', obj);
	}
	return service;
}]);
angular.module('blogApp').controller('loginCtrl', ['$scope', function($scope){

}]);

angular.module('blogApp').controller('registerCtrl', ['$scope', 'blogservice', function($scope, blogservice){
	$scope.registerobj = {};
	$scope.register = function(formregister){
		blogservice.userregister($scope.registerobj).then(function(data){
			console.log(data)
		});
	}
}]);
angular.module('blogApp').controller('blogCtrl',['$scope', function($scope){
	$scope.page = "selectblock";
	$scope.test={};
}]);