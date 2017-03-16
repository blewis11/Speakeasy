angular.module('starter.welcome',[])

.controller('welcomeCtrl', function($scope, $location){

	$scope.gotoMentee = function(){
		$location.path('/welcomeMentee');
	};

	$scope.gotoMentor = function(){
		$location.path('/welcomeMentor');
	};
});