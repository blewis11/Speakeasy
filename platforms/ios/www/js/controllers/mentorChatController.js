angular.module('starter.mentorChat',[])

.controller('mentorChatCtrl', function($rootScope, $scope, $http, $location, $ionicUser, $ionicAuth, NavigatorParameters, $pubnubChannel, Pubnub){
	var params = NavigatorParameters.getParameters();
	$scope.channel = $ionicUser.details.email + '-' + params.email;
	$scope.menteeName = params.username;
	$scope.messaging = {};

	Pubnub.init({
	    publish_key: 'pub-c-11394816-b9ad-4793-8025-56e09441b6df',
	    subscribe_key: 'sub-c-5ecfbc18-fc6d-11e6-99d2-0619f8945a4f',
	    uuid: 54
    });

	$scope.messages = $pubnubChannel($scope.channel, { autoload : 10 });

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
	
});