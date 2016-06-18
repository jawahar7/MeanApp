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
angular.module('blogApp').factory('blogservice', ['$http', function($http){
	var service = {};
	service.userregister = function(obj){
		return $http.post('/api/users', obj);
	};
	service.userlogin = function(obj){
		return $http.post('/api/login', obj);
	};
	service.islogin = function(){
		return $http.get('/api/loggedin');
	};
	return service;
}]);

angular.module('blogApp').factory('authservice',['$q', '$http', '$location', function($q, $http, $location){
	var deferred = $q.defer();
	$http.get('/api/loggedin').success(function(user){
		console.log(user);
		if(user != '0'){
			deferred.resolve();
		}
		else{
			deferred.reject();
			$location.url('/Login');			
		}
	});
	return deferred.promise;
}]);
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
				// blogservice.islogin().then(function(user){
				// 	console.log(user);
				// })
				$location.url('/Blog');
			}
			else{
				$scope.loginobj.password = "";
				$scope.regmessage = "failed";
				$scope.failedmsg = data.data
			}
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
angular.module('blogApp').controller('blogCtrl',['$scope', function($scope){
	$scope.page = "selectblock";
	$scope.test={};
}]);