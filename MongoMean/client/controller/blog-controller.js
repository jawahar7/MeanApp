angular.module('blogApp').controller('blogCtrl',['$rootScope', '$scope', 'blogservice', 'welcomeservice', function($rootScope, $scope, blogservice, welcomeservice){
	$scope.blog = {};
	$scope.blogs = [];
	$scope.logindata = welcomeservice.getObject();	
	$rootScope.showwelcome = true;
	$rootScope.username = $scope.logindata.username;
	
	$scope.getblogbyuser = function(){
		blogservice.getblogbyuserid($scope.logindata._id).then(function(data){			
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

angular.module('blogApp').controller('getblogCtrl',['$rootScope', '$scope', '$routeParams', 'blogservice', 'welcomeservice', function($rootScope, $scope, $routeParams, blogservice, welcomeservice){
	$scope.blog = {};	
	$scope.logindata = welcomeservice.getObject();	
	$rootScope.showwelcome = true;
	$rootScope.username = $scope.logindata.username;	
	$scope.getblogbyid = function(id){
		blogservice.getblogbyblogid(id).then(function(data){
			console.log(data.data)
			$scope.blog = data.data;
		});
	};
	$scope.addcomment = function(){
		$scope.commentmodel = {comment: $scope.blogcomment, commentby: $scope.logindata._id, blogid: $routeParams.blogid};
		blogservice.addcomment($scope.commentmodel).then(function(data){
			$scope.blog = data.data;
			$scope.blogcomment = "";
		});
	}
	$scope.getblogbyid($routeParams.blogid);
}]);	
