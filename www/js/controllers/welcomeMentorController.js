angular.module('starter.welcomeMentor',[])

.controller('welcomeMentorCtrl', function($scope, $http, $location, $ionicDB, $ionicAuth, $ionicUser){
	$scope.user = {};

	$scope.login = function(){
		var details = {
			'email' : $scope.user.email,
			'password' : $scope.user.password,
		}
		$ionicAuth.login('basic', details).then(function(e){
			console.log("in authentication");
			if ($ionicUser.data.data.type == "mentor"){
				$location.path('/mentorHome');
			} else {
				alert("mentees cannot log in here");
			}
			
		});
	}
	
});