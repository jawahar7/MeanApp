angular.module('blogApp').controller('loginCtrl', ['$rootScope', '$scope', '$location', 'blogservice', function($rootScope, $scope, $location, blogservice){
	$rootScope.showwelcome = false;
	$scope.loginobj = {};
	$scope.regmessage = "";
	$scope.failedmsg = "";
	$scope.login = function(loginform){
		$scope.regmessage = "";
		$scope.failedmsg = "";
		blogservice.userlogin($scope.loginobj).then(function(data){
			if(data.data == "success"){
				$scope.loginobj = {};				
				$location.url('/Home');
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

angular.module('blogApp').controller('registerCtrl', ['$rootScope', '$scope', 'blogservice', function($rootScope, $scope, blogservice){
	$rootScope.showwelcome = false;
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