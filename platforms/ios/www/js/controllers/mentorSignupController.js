angular.module('starter.mentorSignup',[])

.controller('mentorSignupCtrl', function($scope, $http, $location, $ionicUser, $ionicAuth,$ionicDB){
	
	$scope.user = {};
	$scope.fullName = $scope.user.fName + ' ' + $scope.user.lName;

	$scope.signup = function(){
		var details = {
			'email' : $scope.user.email,
			'password' : $scope.user.password,
			'username' : $scope.user.username,
			'name' : $scope.user.fName + ' ' + $scope.user.lName,
			'custom' : {
				'type' : 'mentor',
				'mentee' : ''
			}
		}

		$ionicAuth.signup(details).then(function() {
			$ionicDB.connect();
			 var messages = $ionicDB.collection('mentors');
			 messages.store(details);
	 		 $location.path('/welcomeMentor');
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