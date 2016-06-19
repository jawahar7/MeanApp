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