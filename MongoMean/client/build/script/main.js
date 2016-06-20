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
//Factories
angular.module('blogApp').factory('blogservice', ['$http', function($http){
	var service = {};
	service.userregister = function(obj){
		return $http.post('/api/users', obj);
	};
	service.userlogin = function(obj){
		return $http.post('/api/login', obj);
	};	
	return service;
}]);

//Services

angular.module('blogApp').controller('loginCtrl', ['$scope', '$location', 'blogservice', function($scope, $location, blogservice){
	$scope.loginobj = {};
	$scope.regmessage = "";
	$scope.failedmsg = "";
	$scope.login = function(loginform){
		$scope.regmessage = "";
		$scope.failedmsg = "";
		blogservice.userlogin($scope.loginobj).then(function(data){
			if(data.data == "success"){
				$scope.loginobj = {};				
				$location.url('/Blog');
			}
			else{
				$scope.loginobj.password = "";
				$scope.regmessage = "failed";
				$scope.failedmsg = data.data
			}
		},function(err){
			console.log(err);
			$scope.loginobj = {};
			$scope.regmessage = "failed";
			$scope.failedmsg = err.statusText
		});
	}
}]);

angular.module('blogApp').controller('registerCtrl', ['$scope', 'blogservice', function($scope, blogservice){
	$scope.registerobj = {};
	$scope.regmessage = "";
	$scope.register = function(formregister){
		blogservice.userregister($scope.registerobj).then(function(data){
			if(data.data == "success") {
				$scope.registerobj = {};
				$scope.regmessage = "success";
			}
			else{
				$scope.regmessage = "failed";
			}
		});
	}
}]);
angular.module('blogApp').controller('blogCtrl',['$rootScope', '$scope', 'welcomeservice', function($rootScope, $scope, welcomeservice){
	$scope.logindata = welcomeservice.getObject();
	console.log($scope.logindata);
	$rootScope.showwelcome = true;
	$rootScope.username = $scope.logindata.username;
}]);