'use strict';

var app = angular.module('myApp', ['firebase', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('splash', {
			url:'/', 
			templateUrl:'./partials/splash.html', 
			controller: 'splashCtrl'
		})
		.state('login', {
			url: '/login',
			templateUrl: './partials/login.html',
			controller: 'loginCtrl'
		})
		.state('register', {
			url: '/register',
			templateUrl: './partials/register.html',
			controller: 'registerCtrl'
		})
		.state('home', {
			url: '/home',
			templateUrl: './partials/home.html',
			controller: 'homeCtrl'
		});

	$urlRouterProvider.otherwise('/');
});

app.controller('splashCtrl', function($scope, $http, $state, Auth) {
	console.log('splash');
	$scope.Auth.register({
		email: $scope.user.email,
		password: $scope.user.password
	})
	.then(redirectHome)
	.catch(existingUser);

	function redirectHome(authData) {
		console.log('authData:', authData);
		$state.go('home');
	}

	function invalidLogin(authData) {
		invalidEntry(authData, 'Invalid email or password')
	}

	function existingUser(authData) {
		invalidEntry(authData, 'Email already exists')
	}


})

app.controller('navCtrl', function($scope) {
	console.log('Nav');
})

app.factory('fbRef', function($window) {
	return new $window.Firebase('https://newmeanapp.firebaseio.com/');
});

app.factory('fbAuth', function(fbRef, $firebaseAuth) {
	return $firebaseAuth(fbRef);
});

app.factory('Auth', function(fbAuth) {
	return {
		register: function(userObj) {
			return fbAuth.$createUser(userObj)
			.then(function(userData) {
				console.log("User " + userData.uid + " created successfully");
				return fbAuth.$authWithPassword(userObj);
			});
		}
	}
});