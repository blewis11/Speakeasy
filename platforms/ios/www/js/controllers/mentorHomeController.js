angular.module('starter.mentorHome',[])

.controller('mentorHomeCtrl', function($scope, $http, $location, $ionicUser, $ionicAuth, $ionicDB, NavigatorParameters){
	// if($ionicUser.data.data.type != 'mentor'){
	// 	$location.path('/welcomeMentor');
	// }

	$scope.chatMentees = [];
	$scope.welcomeMsg = "Hi, " + $ionicUser.details.username + "!";
	$ionicDB.connect();
	var mentors = $ionicDB.collection('mentors');
	var mentees = $ionicDB.collection('mentees');

	mentors.find({ email : $ionicUser.details.email }).fetch().subscribe(function(msg){
		mentees.find({email : msg.custom.mentee}).fetch().subscribe(function(msg){
			$scope.chatMentees.push(msg);
		});
	});

	$scope.gotoConvo = function(mentee){
		NavigatorParameters.setParameters(mentee);
		$location.path('/mentorChat');
	}

});