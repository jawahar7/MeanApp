angular.module('blogApp').controller('homeCtrl',['$rootScope', '$scope', 'welcomeservice', function($rootScope, $scope, welcomeservice){
	$scope.logindata = welcomeservice.getObject();	
	$rootScope.showwelcome = true;
	$rootScope.username = $scope.logindata.username;		
}]);