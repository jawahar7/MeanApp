//Factories
angular.module('blogApp').factory('blogservice', ['$http', function($http){
	var service = {};
	service.userregister = function(obj){
		return $http.post('/api/users', obj);
	};
	service.userlogin = function(obj){
		return $http.post('/api/login', obj);
	};
    service.getotherblog = function(id){
        return $http.get('/api/blogs/other/'+ id);
    };
    service.getblogbyuserid = function(id){
        return $http.get('/api/blogs/user/'+ id);
    };
    service.getblogbyblogid = function(id){
        return $http.get('/api/blogs/blog/'+ id);
    };
    service.saveblog = function(obj){
        return $http.post('/api/blogs', obj);
    };
	return service;
}]);

//Services
angular.module('blogApp').service('welcomeservice',['$cookies', function($cookies){
	return {
        setObject: function (value) {            
            $cookies.putObject("autharray", value);
        },
        getObject: function () {           	   
            return $cookies.getObject("autharray");
        },
        clear: function () {
            $cookies.remove("autharray");
        }
    }
}]);