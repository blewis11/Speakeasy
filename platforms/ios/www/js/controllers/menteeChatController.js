angular.module('starter.menteeChat',[])

.controller('menteeChatCtrl', function($state, $scope, $location, $ionicUser, $ionicDB, NavigatorParameters, $pubnubChannel, Pubnub){
	$scope.messaging = {};

	Pubnub.init({
	    publish_key: 'pub-c-11394816-b9ad-4793-8025-56e09441b6df',
	    subscribe_key: 'sub-c-5ecfbc18-fc6d-11e6-99d2-0619f8945a4f',
	    uuid: 54
    });

	var params = NavigatorParameters.getParameters();
	$scope.mentorName = params.chattingTo.username;

	$scope.channel = params.chattingTo.email + "-" + $ionicUser.details.email;

	$scope.messages = $pubnubChannel($scope.channel, { autoload : 10 });
	console.log("messages");
	console.log($scope.messages);

    Pubnub.subscribe({
	   channels  : [$scope.channel],
	   withPresence: true,
	   triggerEvents: ['message', 'presence', 'status']
	});

	$scope.send = function(){
		console.log("Publishing: " + $scope.messaging.messageContent);
		$scope.messages.$publish({message: $scope.messaging.messageContent , from: $ionicUser.details.username});
		$scope.messaging.messageContent = '';
		console.log($scope.messages);
	}

	$scope.endConvo = function(){
		$ionicDB.connect();
		var mentees = $ionicDB.collection('mentees');
		mentees.find({email : $ionicUser.details.email}).fetch().subscribe(function(msg){
			//remove mentor from mentees chats
			mentees.update([{
				id: msg.id,
				custom : {
					mentor: ""
				}
			}]);
		});

		var mentors = $ionicDB.collection('mentors');
		mentors.find({email : params.chattingTo.email}).fetch().subscribe(function(msg){
			//remove mentee from mentor chats
			mentors.update([{
				id: msg.id,
				custom : {
					mentee: ""
				}
			}]);
			//push notification to mentor
		});

		//go back to welcome page, now reset with mentors to pick from 
		$location.path('/menteeHome');
	}

});