angular.module('starter.menteeSignup',[])

.controller('menteeSignupCtrl', function($scope, $http, $location, $ionicUser, $ionicAuth, $ionicDB){
	$scope.user = {};

	$scope.signup = function(){
		var details = {
			'email' : $scope.user.email,
			'password' : $scope.user.password,
			'username' : $scope.user.username,
			'custom' : {
				'type' : 'mentee',
				'mentor' : ''
			}
		}

		$ionicAuth.signup(details).then(function() {
			 $ionicDB.connect();
			 var messages = $ionicDB.collection('mentees');
			 messages.store(details);
	 		 $location.path('/welcomeMentee');
		 }, function(err) {
		  for (var e of err.details) {
		    if (e === 'conflict_email') {
		      alert('Email already exists.');
		    } else {
		      // handle other errors
		    }
		  }
		});
	}

});