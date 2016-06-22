angular.module('blogApp').controller('homeCtrl',['$rootScope', '$scope', 'blogservice', 'welcomeservice', function($rootScope, $scope, blogservice, welcomeservice){
	$scope.blogs = [];
	$scope.logindata = welcomeservice.getObject();	
	$rootScope.showwelcome = true;
	$rootScope.username = $scope.logindata.username;

	$scope.getotherblogs = function(){
		blogservice.getotherblog($scope.logindata._id).then(function(data){
			$scope.blogs = data.data
		})
	};
	$scope.getotherblogs();
}]);