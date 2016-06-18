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
		controller: 'blogCtrl',
		resolve: {
			authservice: authservice
			//checkLoggedIn: checkLoggedIn
		}
	});
}]);

// function checkLoggedIn($q, $http, $location){
// 	var deferred = $q.defer();
// 	$http.get('/api/loggedin').success(function(user){
// 		console.log(user);
// 		if(user != '0'){
// 			deferred.resolve();
// 		}
// 		else{
// 			deferred.reject();
// 			$location.url('/Login');			
// 		}
// 	});
// 	return deferred.promise;
// }