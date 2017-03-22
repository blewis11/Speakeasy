angular.module('starter.welcomeMentee',[])

.controller('welcomeMenteeCtrl', function($ionicSlideBoxDelegate, $scope, $http, $location, $ionicDB, $ionicAuth, $ionicUser){

	$scope.user = {};
	$scope.userReg = {};
	$ionicDB.connect();

	$scope.loginButtonClass = {swipeButtonLogin: true, current: true}
	$scope.registerButtonClass = {swipeButtonRegister: true}

	$scope.login = function(){
		var details = {
			'email' : $scope.user.email,
			'password' : $scope.user.password,
			'custom': {
        		'type': 'mentee'
    		}
		}
		$ionicAuth.login('basic', details).then(function(e){
			if ($ionicUser.data.data.type == "mentee"){

				var mentee = $ionicDB.collection('mentees');
				mentee.find({email : $ionicUser.details.email}).fetch().subscribe(function(msg){
					console.log(msg.custom.mentor);
					if (msg.custom.mentor == ""){
						$location.path('/noMentor');
					} else {
						$location.path('/menteeHome');
					}
				});

			} else {
				alert("mentors cannot log in here");
			}
		});
	}

	function hasMentor(){
		console.log("inside hasMentor");
		var mentee = $ionicDB.collection('mentees');
		mentee.find({email : $ionicUser.details.email}).fetch().subscribe(function(msg){
			console.log(msg.custom.mentor);
			if (msg.custom.mentor == ""){
				return false;
			} else {
				return true;
			}
		})
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

	$scope.gotoLogin = function(){
		$ionicSlideBoxDelegate.slide(0);
	}

	$scope.gotoRegister = function(){
		$ionicSlideBoxDelegate.slide(1);
	}

	$scope.signup = function(){
		var details = {
			'email' : $scope.userReg.email,
			'password' : $scope.userReg.password,
			'username' : $scope.userReg.username,
			'custom' : {
				'type' : 'mentee',
				'mentor' : ''
			}
		}

		$ionicAuth.signup(details).then(function() {
			 $ionicDB.connect();
			 var messages = $ionicDB.collection('mentees');
			 messages.store(details);
	 		 $location.path('/welcomeMentee');
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

