var blogApp = angular.module('blogApp', ['ngRoute', 'ui.editable']);

// angular.module('blogApp').factory('authservice',['$q', '$http', '$location', function($q, $http, $location){
// 	var service = {};
// 	service.islogin = function(){
// 		var deferred = $q.defer();
// 		$http.get('/api/loggedin').success(function(user){
// 			console.log(user);
// 			if(user != '0'){
// 				deferred.resolve();
// 			}
// 			else{
// 				deferred.reject();
// 				$location.url('/Login');			
// 			}
// 		});
// 		console.log(deferred.promise)
// 		return deferred.promise;
// 	}
// return service;
// }]);

angular.module('blogApp')
.factory('authservice',['$q', '$http', '$location', function($q, $http, $location){
	var service = {};
	service.islogin = function(){
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
		console.log(deferred.promise)
		return deferred.promise;
	}
return service;
}])
.config(['$routeProvider', 'authserviceProvider', function($routeProvider, authserviceProvider){
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
			authservice: function (authserviceProvider) {
				console.log(authserviceProvider)
                	return authserviceProvider.islogin().then(function (response) {                	
                });
              	//return authservice.islogin();
            }           
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

angular.module("ui.editable", []).directive('txtEditable', function () {
   return {
       restrict: 'E',
       scope: {
           editableModel: '='
       },
       template: '<span ng-show="show" ng-model="editableModel" class="ng-scope ng-binding editable editable-click">{{editableModel || "empty"}}</span>' +
                           '&nbsp;<i ng-show="show" ng-click="editshow()" style="cursor:pointer;" class="glyphicon glyphicon-pencil"></i>' +
                           '<div ng-show="!show" class="editable-controls form-group">' +
                               '<input type="text" class="editable-has-buttons editable-input form-control" ng-model="txtval" />' +
                               '<span class="editable-buttons" style="margin-top:2px">' +
                                   '<button type="submit" class="btn btn-primary" ng-click="editableok()">' +
                                       '<span class="glyphicon glyphicon-ok"></span>' +
                                   '</button>' +
                                   '<button type="button" class="btn btn-default" ng-click="editablecancel()">' +
                                       '<span class="glyphicon glyphicon-remove"></span>' +
                                   '</button></span></div>',
       controller: function ($scope) {
           $scope.show = true;
           $scope.editshow = function () {
               $scope.show = false;
               $scope.txtval = $scope.editableModel;
           }
           $scope.editableok = function () {
               $scope.editableModel = $scope.txtval;
               $scope.show = true;
           }
           $scope.editablecancel = function () {
               $scope.show = true;
           }
       }
   };
});