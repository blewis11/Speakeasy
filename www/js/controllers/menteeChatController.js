angular.module('starter.menteeChat',[])

.controller('menteeChatCtrl', function($ionicPopup, $ionicScrollDelegate, $state, $scope, $location, $ionicUser, $ionicDB, NavigatorParameters, $pubnubChannel, Pubnub){
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

	$scope.$on('$ionicView.enter', function() {
      $ionicScrollDelegate.scrollBottom();
  	})

	$scope.send = function(){
		console.log("Publishing: " + $scope.messaging.messageContent);
		$scope.messages.$publish({message: $scope.messaging.messageContent , from: $ionicUser.details.username, date: new Date()});
		$scope.messaging.messageContent = '';
		$ionicScrollDelegate.resize()
		$ionicScrollDelegate.scrollBottom(true);
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
		
	   var alertPopup = $ionicPopup.alert({
	     title: 'Chat Ended',
	     template: 'We hope you had a nice talk with ' + $scope.mentorName + '! Have a wonderful day.' 
	   });

	   alertPopup.then(function(res) {
	    $location.path('/noMentor');
	   });
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

});