angular.module('blogApp').controller('loginCtrl', ['$scope', function($scope){

}]);

angular.module('blogApp').controller('registerCtrl', ['$scope', 'blogservice', function($scope, blogservice){
	$scope.registerobj = {};
	$scope.register = function(formregister){
		blogservice.userregister($scope.registerobj).then(function(data){
			console.log(data)
		});
	}
}]);