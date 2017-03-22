angular.module('starter.welcomeMentee',[])

.controller('welcomeMenteeCtrl', function($scope, $http, $location, $ionicDB, $ionicAuth, $ionicUser){

	$scope.user = {};

	$scope.login = function(){
		var details = {
			'email' : $scope.user.email,
			'password' : $scope.user.password,
			'custom': {
        		'type': 'mentee'
    		}
		}
		$ionicAuth.login('basic', details).then(function(e){
			console.log("in authentication");
			if ($ionicUser.data.data.type == "mentee"){
				$location.path('/menteeHome');
			} else {
				alert("mentors cannot log in here");
			}
		});
	}
	
});