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
		controller: 'blogCtrl'		
	});
}]);

angular.module('blogApp').service('welcomeservice',['$cookies', function($cookies){
	return {
        setObject: function (value) {            
            $cookies.putObject("autharray", value);
        },
        getObject: function () {   
        	console.log('call');        
            return $cookies.getObject("autharray");
        },
        clear: function () {
            $cookies.remove("autharray");
        }
    }
}]);

angular.module('blogApp').factory('authservice',['$q', '$http', '$location', 'welcomeservice', function($q, $http, $location, welcomeservice){
	var service = {};
	service.islogin = function(){
		var deferred = $q.defer();
		$http.get('/api/loggedin').then(function(user){
			console.log(user.data);
			if(user.data != '0'){
				deferred.resolve();
				welcomeservice.setObject(user.data);
			}
			else{
				deferred.reject();
				welcomeservice.clear();
				$location.url('/Login');			
			}			
		});	
		return deferred.promise;			
	}
return service;
}]);

angular.module('blogApp').run(['$rootScope', 'authservice', function($rootScope, authservice){
	$rootScope.$on('$routeChangeStart', function () {		
		return authservice.islogin().then(function(){

		});
	});
}]);