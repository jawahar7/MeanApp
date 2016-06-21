var blogApp = angular.module('blogApp', ['ngRoute', 'ngCookies']);

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
			checkLoggedIn: checkLoggedIn
		}		
	});
	$routeProvider.when('/Logout', {		
		resolve: {
			Logout: Logout
		}		
	});
}]);

var checkLoggedIn = ['$q', '$http', '$location', 'welcomeservice', function ($q, $http, $location, welcomeservice) {
    var deferred = $q.defer();
	$http.get('/api/loggedin').success(function(user){		
		if(user != '0'){
			welcomeservice.setObject(user);
			deferred.resolve();
		}
		else{
			welcomeservice.clear();
			deferred.reject();
			$location.url('/Login');
		}
	});
	return deferred.promise;
}]

var Logout = ['$q', '$http', '$location', 'welcomeservice', function ($q, $http, $location, welcomeservice) {
    var deferred = $q.defer();
	$http.get('/api/logout').success(function(result){		
		welcomeservice.clear();
		deferred.reject();
		$location.url('/Login');		
	});
	return deferred.promise;
}]