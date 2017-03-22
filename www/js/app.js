// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ionic.cloud', 'starter.welcome', 
  'starter.welcomeMentee', 'starter.welcomeMentor', 'starter.menteeHome', 'starter.mentorHome'
  ,'starter.menteeSignup', 'starter.mentorSignup','pubnub.angular.service', 'starter.menteeChat',
  'starter.navigatorParams', 'starter.mentorChat', 'homeTeeNoTorController', 'homeTorNoTeeController'])

.config(function($ionicCloudProvider) {
  $ionicCloudProvider.init({
    "core": {
      "app_id": "3977d617"
    },
    "database": {
      "authType": "authenticated"
    }
  });
})
.run(function($ionicPlatform, Pubnub) {
  $ionicPlatform.ready(function() {

    //initialize pubnub
    //Pubnub.init({
    //publish_key: 'pub-c-11394816-b9ad-4793-8025-56e09441b6df',
    //subscribe_key: 'sub-c-5ecfbc18-fc6d-11e6-99d2-0619f8945a4f',
    //});

    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}).config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

   .state('welcome', {
      url: '/welcome',
      templateUrl: 'templates/welcome.html',
      controller: 'welcomeCtrl'
    })

   .state('welcomeMentee', {
      cache: false,
      url: '/welcomeMentee',
      templateUrl: 'templates/welcomeMentee.html',
      controller: 'welcomeMenteeCtrl'
   })

   .state('welcomeMentor', {
      cache: false,
      url: '/welcomeMentor',
      templateUrl: 'templates/welcomeMentor.html',
      controller: 'welcomeMentorCtrl'
   })

    .state('menteeSignup', {
      cache: false,
      url: '/signupMentee',
      templateUrl: 'templates/menteeSignup.html',
      controller: 'menteeSignupCtrl'
   })

    .state('mentorSignup', {
      cache: false,
      url: '/signupMentor',
      templateUrl: 'templates/mentorSignup.html',
      controller: 'mentorSignupCtrl'
   })

    .state('menteeHomeNoMentor',{
      url: '/menteeHomeNoMentor',
      templateUrl: 'templates/'
    })

   .state('menteeHome', {
      cache: false,
      url: '/menteeHome',
      templateUrl: 'templates/homeMentee.html',
      controller: 'menteeHomeCtrl',
   })


   .state('mentorHome', {
      cache: false,
      url: '/mentorHome',
      templateUrl: 'templates/homeMentor.html',
      controller: 'mentorHomeCtrl'
   })

   .state('noMentor', {
      cache: false,
      url: '/noMentor',
      templateUrl: 'templates/homeMenteeNoMentor.html',
      controller: 'homeTeeNoTorCtrl'
   })

   .state('noMentee', {
      cache: false,
      url:'/noMentee',
      templateUrl: 'templates/homeMentorNoMentee.html',
      controller: 'homeTorNoTeeCtrl'
   })

  .state('menteeChat', {
        cache: false,
        url: '/menteeChat',
        templateUrl: 'templates/menteeChat.html',
        controller: 'menteeChatCtrl'
  })

  .state('mentorChat', {
        cache: false,
        url: '/mentorChat',
        templateUrl: 'templates/mentorChat.html',
        controller: 'mentorChatCtrl'
  })

   .state('main', {
      cache: false,
      url: '/main',
      templateUrl: 'templates/main.html',
      controller: 'mainCtrl'
    });
   
    $urlRouterProvider.otherwise('/welcome');
});
