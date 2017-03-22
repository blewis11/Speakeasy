angular.module('homeTorNoTeeController',[])

.controller('homeTorNoTeeCtrl', function($scope, $ionicUser){
	$scope.welcomeMsg = "Hi, " + $ionicUser.details.username + "!";
});