angular.module('starter.welcomeMentor',[])

.controller('welcomeMentorCtrl', function($ionicSlideBoxDelegate, $scope, $http, $location, $ionicDB, $ionicAuth, $ionicUser){
	$scope.user = {};
	$scope.userReg = {};
	$ionicDB.connect();
	
	$scope.loginButtonClass = {swipeButtonLogin: true, current: true}
	$scope.registerButtonClass = {swipeButtonRegister: true}

	$scope.login = function(){
		console.log("In login");
		var details = {
			'email' : $scope.user.email,
			'password' : $scope.user.password,
		}
		$ionicAuth.login('basic', details).then(function(e){
			if ($ionicUser.data.data.type == "mentor"){

				var mentors = $ionicDB.collection('mentors');
				mentors.find({email : $ionicUser.details.email}).fetch().subscribe(function(msg){
					console.log(msg.custom.mentee);
					if (msg.custom.mentee == ""){
						$location.path('/noMentee')
					} else {
						$location.path('/mentorHome');
					}
				});
			} else {
				alert("mentees cannot log in here");
			}
			
		});
	}

	$scope.gotoLogin = function(){
		$ionicSlideBoxDelegate.slide(0);
	}

	$scope.gotoRegister = function(){
		$ionicSlideBoxDelegate.slide(1);
	}

	$scope.slideChanged = function(index){
		if (index == 0){
			$scope.loginButtonClass = {swipeButtonLogin: true, current: true}
			$scope.registerButtonClass = {swipeButtonRegister: true, current: false}
		} else {
			$scope.loginButtonClass = {swipeButtonLogin: true, current: false}
			$scope.registerButtonClass = {swipeButtonRegister: true, current: true}
		}

	}

	$scope.signup = function(){
		var details = {
			'email' : $scope.userReg.email,
			'password' : $scope.userReg.password,
			'username' : $scope.userReg.username,
			'name' : $scope.userReg.fName + ' ' + $scope.userReg.lName,
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

		$scope.userReg = {};
		$scope.gotoLogin();
	}


	
});