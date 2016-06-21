angular.module('blogApp').controller('blogCtrl',['$rootScope', '$scope', 'blogservice', 'welcomeservice', function($rootScope, $scope, blogservice, welcomeservice){
	$scope.logindata = welcomeservice.getObject();	
	$rootScope.showwelcome = true;
	$rootScope.username = $scope.logindata.username;
	
	$scope.addblog = function(){
		$scope.blog={};
		$scope.blog.blogheading = "Test Blog";
		$scope.blog.blogcontent = "Hi welcome to my blog";
		$scope.blog.createdby = $scope.logindata._id;
		blogservice.saveblog($scope.blog).then(function(){
		});
	}
}]);