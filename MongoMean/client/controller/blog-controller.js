angular.module('blogApp').controller('blogCtrl',['$rootScope', '$scope', 'blogservice', 'welcomeservice', function($rootScope, $scope, blogservice, welcomeservice){
	$scope.blog = {};
	$scope.blogs = [];
	$scope.logindata = welcomeservice.getObject();	
	$rootScope.showwelcome = true;
	$rootScope.username = $scope.logindata.username;
	
	$scope.getblogbyuser = function(){
		blogservice.getblogbyid($scope.logindata._id).then(function(data){			
			$scope.blogs = data.data;
		});
	}
	$scope.addblog = function(){		
		$scope.blog.createdby = $scope.logindata._id;		
		blogservice.saveblog($scope.blog).then(function(data){
			$scope.blog = {};
			$scope.getblogbyuser();
		});
	}
	$scope.getblogbyuser();
}]);