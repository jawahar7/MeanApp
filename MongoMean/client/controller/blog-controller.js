angular.module('blogApp').controller('blogCtrl',['$rootScope', '$scope', 'welcomeservice', function($rootScope, $scope, welcomeservice){
	$scope.logindata = welcomeservice.getObject();
	console.log($scope.logindata);
	$rootScope.showwelcome = true;
	$rootScope.username = $scope.logindata.username;
}]);