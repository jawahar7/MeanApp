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