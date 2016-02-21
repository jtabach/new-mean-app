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
			controller: 'splashCtrl'
		})
		.state('register', {
			url: '/register',
			templateUrl: './partials/register.html',
			controller: 'splashCtrl'
		})
		.state('home', {
			url: '/home',
			templateUrl: './partials/home.html',
			controller: 'homeCtrl'
		});

	$urlRouterProvider.otherwise('/');
});

app.controller('mainCtrl', function($scope, User) {
	$scope.user = User;

	// $scope.add = function(desc) {
	// 	$scope.list.$add({
	// 		desc: desc,
	// 		complete: false
	// 	});

	// 	$scope.desc="";
	// }
});

app.controller('splashCtrl', function($scope, $http, $state, Auth) {
	console.log('splash');
	console.log($scope);
	$scope.register = function() {
 		Auth.register({
			email: $scope.user.email,
			password: $scope.user.password
		})
		.then(redirectHome)
		.catch(existingUser);
	}
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

	function invalidEntry(err, message) {
			// resetForm();
			alert(message);
			console.log('err:', err)
		}

})

app.controller('navCtrl', function($scope) {
	console.log('Nav');
})

app.controller('homeCtrl', function($scope) {

})

app.factory('User', function(fbRef, $firebaseObject) {
	var userRef = fbRef.child('user');
	return $firebaseObject(userRef);
});

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