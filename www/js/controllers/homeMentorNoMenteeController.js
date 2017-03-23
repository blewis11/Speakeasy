angular.module('homeTorNoTeeController',[])

.controller('homeTorNoTeeCtrl', function($scope, $ionicUser, $ionicDB, $interval, $ionicPopup, $location){
	$scope.welcomeMsg = "Hi, " + $ionicUser.details.username + "!";
	$ionicDB.connect();

	$scope.$on('$ionicView.enter', function() {	
    	$scope.interval = $interval(function(){
		var mentors = $ionicDB.collection('mentors');
		mentors.find({email : $ionicUser.details.email}).fetch().subscribe(function(msg){
			if (msg.custom.mentee != ""){
				var alertPopup = $ionicPopup.alert({
			      title: 'Somebody Chose You!',
			   	  template: 'A mentee has asked to chat, press OK to proceed to chat view' 
			   	});
				$interval.cancel($scope.interval);
			   alertPopup.then(function(res) {
			    $location.path('/mentorHome');
			   });
			}
		});
		}, 2000);
  	});

});