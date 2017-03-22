angular.module('homeTeeNoTorController',[])

.controller('homeTeeNoTorCtrl', function($scope, $ionicDB, $ionicUser){

	$ionicDB.connect();
	$scope.welcomeMsg = "Hi, " + $ionicUser.details.username + "!";
	$scope.mentors = [];

	var mentees = $ionicDB.collection('mentees');
	var mentors = $ionicDB.collection('mentors');

	//get all mentors who have not yet been assigned a mentee
	function getData(){
		mentors.fetch().subscribe(function(msg){
			for (var i=0; i<msg.length; i++){
				if (msg[i].custom.mentee == "")
					$scope.mentors.push(msg[i]);
			}
		});
	}

	$scope.assign = function(mentor){
		mentees.find({email : $ionicUser.details.email}).fetch().subscribe(function(msg){
			mentees.update([{
				id: msg.id,
				custom : {
					mentor: mentor.email
				}
			}]);
		});

		mentors.find({email : mentor.email}).fetch().subscribe(function(msg){
			mentors.update([{
				id: msg.id,
				custom : {
					mentee : $ionicUser.details.email
				}
			}]);
		});
		
		//go to chat window here
	}

	//initialize page with everything
	getData();
});