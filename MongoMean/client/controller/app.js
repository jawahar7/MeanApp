var blogApp = angular.module('blogApp', ['ngRoute', 'ngCookies', 'chieffancypants.loadingBar']);

angular.module('blogApp').config(['$routeProvider', function($routeProvider){	
	$routeProvider.when('/', {
		templateUrl: 'login/login',
		controller: 'loginCtrl',
		title: 'Login'
	});
	$routeProvider.when('/Login', {
		templateUrl: 'login/login',
		controller: 'loginCtrl',
		title: 'Login'
	});
	$routeProvider.when('/Register', {
		templateUrl: 'login/register',
		controller: 'registerCtrl',
		title: 'Register'
	});
	$routeProvider.when('/Home', {
		templateUrl: 'home/dashboard',
		controller: 'homeCtrl',
		title: 'Home',
		resolve: {
			checkLoggedIn: checkLoggedIn
		}
	});
	$routeProvider.when('/Blog', {
		templateUrl: 'blogs/blogs',
		controller: 'blogCtrl',
		title: 'Blog',
		resolve: {
			checkLoggedIn: checkLoggedIn
		}		
	});
	$routeProvider.when('/Blog/:blogid', {
		templateUrl: 'blogs/getblog',
		controller: 'getblogCtrl',
		title: 'Blog',
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

angular.module("blogApp").run(['$rootScope', function ($rootScope) {
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.stateIsLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {        
        if (current.hasOwnProperty('$$route')) {
            $rootScope.title = current.$$route.title;
        }
        $rootScope.stateIsLoading = false;
    });
} ]);

var checkLoggedIn = ['$q', '$http', '$location', 'welcomeservice', function ($q, $http, $location, welcomeservice) {
	debugger;
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