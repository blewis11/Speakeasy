angular.module('starter.mentorChat',[])

.controller('mentorChatCtrl', function($ionicPopup, $interval, $ionicScrollDelegate, $rootScope, $scope, $http, $location, $ionicUser, $ionicAuth, NavigatorParameters, $pubnubChannel, Pubnub, $ionicDB){
	var params = NavigatorParameters.getParameters();
	$scope.channel = $ionicUser.details.email + '-' + params.email;
	$scope.menteeName = params.username;
	$scope.messaging = {};
	$ionicDB.connect();
	$scope.interval;

	$scope.$on('$ionicView.enter', function() {	
    	$scope.interval = $interval(function(){
		var mentors = $ionicDB.collection('mentors');
		mentors.find({email : $ionicUser.details.email}).fetch().subscribe(function(msg){
			if (msg.custom.mentee == ""){
				var alertPopup = $ionicPopup.alert({
			      title: 'Time\'s up!',
			   	  template: $scope.menteeName + ' has ended the conversation, we\'ll let you know when you are assigned another mentee' 
			   	});
				$interval.cancel($scope.interval);
			   alertPopup.then(function(res) {
			    $location.path('/noMentee');
			   });
			}
		});
		}, 5000);
  	});

	

	Pubnub.init({
	    publish_key: 'pub-c-11394816-b9ad-4793-8025-56e09441b6df',
	    subscribe_key: 'sub-c-5ecfbc18-fc6d-11e6-99d2-0619f8945a4f',
	    uuid: 54
    });

    Pubnub.subscribe({
	   channels  : [$scope.channel],
	   withPresence: true,
	   triggerEvents: ['message', 'presence', 'status']
	});

	$scope.messages = $pubnubChannel($scope.channel, { autoload : 10 });


	$scope.$on('$ionicView.enter', function() {
      $ionicScrollDelegate.scrollBottom();
  	})

	$scope.send = function(){
		console.log("Publishing: " + $scope.messaging.messageContent);
		$scope.messages.$publish({message: $scope.messaging.messageContent , from: $ionicUser.details.username});
		$scope.messaging.messageContent = '';
		$ionicScrollDelegate.scrollBottom(true);
	}

	$scope.leftOrRight = function(from){
		if (from == $ionicUser.details.username){
			return 'pullRight';
		} else {
			return 'pullLeft';
		}
	}

	$scope.bubbleDirection = function(from){
		if (from == $ionicUser.details.username){
			return 'talk-bubble tri-right right-top'
		} else {
			return 'talk-bubble tri-left left-top'
		}
	}

	$scope.checkForMentee = function(){
		console.log("checking for mentees");
		var mentors = $ionicDB.collection('mentors');
		mentors.find({email : $ionicUser.details.email}).fetch().subscribe(function(msg){
			if (msg.custom.mentee == ""){
				var alertPopup = $ionicPopup.alert({
			      title: 'Time\'s up!',
			   	  template: $scope.menteeName + ' has ended the conversation, we\'ll let you know when you are assigned another mentee' 
			   	});

			   alertPopup.then(function(res) {
			    $location.path('/noMentee');
			   });
			}
		});
	} 	
	
});