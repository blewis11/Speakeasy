angular.module('starter.login',[])

.controller('mainCtrl', function($scope, $http, $location, $ionicUser, $ionicAuth){
	if (!($ionicAuth.isAuthenticated())) {
		$location.path('/login');
	}

	$scope.welcome = "Hello, " + $ionicUser.details.username + "!";
});