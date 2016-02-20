var app = angular.module('myApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url:'/', 
			templateUrl:'./partials/home.html', 
			controller: 'homeCtrl'
		});

	$urlRouterProvider.otherwise('/');
});

app.controller('homeCtrl', function($scope, $http, $state) {
	console.log('home');
})