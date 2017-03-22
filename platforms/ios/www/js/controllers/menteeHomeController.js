angular.module('starter.menteeHome',[])

.controller('menteeHomeCtrl', function($scope, $http, $location, $ionicUser, $ionicAuth, $ionicDB, $rootScope, Pubnub, NavigatorParameters, $state){
	if($ionicUser.data.data.type != 'mentee'){
		$location.path('/welcomeMentee')
	}

	$scope.chatMentors = [];

	$ionicDB.connect();
	var mentors = $ionicDB.collection('mentors');
	
	function getData(){
		mentors.fetch().subscribe(function(msg){
			console.log($ionicUser.details.email);
			for (var i=0; i<msg.length; i++){
				if(msg[i].custom.mentee == $ionicUser.details.email)
					$scope.chatMentors.push(msg[i]);
			}
		});
	}


	$scope.gotoConvo = function(mentor){
		var data = {
			chattingTo : mentor
		}
		NavigatorParameters.setParameters(data);
		$location.path('/menteeChat');
	}

	getData();
});