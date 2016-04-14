/**
* movieApp Module
*
* Description
*/

var movieApp = angular.module("movieApp",['ngRoute', 'ngAnimate']);

movieApp.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {
		
		$routeProvider
			.when('/',{
				templateUrl: 'templates/main.html',
				controller: 'MainController'
			})

			.when('/search',{
				templateUrl: 'templates/search.html',
				controller: 'SearchController'
			})

			.when('/result',{
				templateUrl: 'templates/result.html',
				controller: 'ResultController'
			})

			.otherwise({
				redirectTo: '/'
			});

		$locationProvider.html5Mode(true);
	}]);

movieApp.factory('searchValueService',function($rootScope, $timeout){
  	var service = {};

  	service.data = false;

  	service.sendData = function(data){
      	this.data = data;
      	$timeout(function(){
        	$rootScope.$broadcast('data_shared');
      	},100);
  	};

  	service.getData = function(){
    	return this.data;
  	};

  	return service;
	});

movieApp.controller('MainController', ['$scope', function($scope){
		$scope.background = 'mainPage';
	}]);

movieApp.controller('SearchController', ['$scope', 'searchValueService', function($scope, searchValueService){
		$scope.background = "searchPage";
		$scope.searchValue = "";
		$scope.send = function () {
			searchValueService.sendData($scope.searchValue);
		}
		
	}]);

movieApp.controller('ResultController', ['$scope', 'searchValueService', '$http',function($scope, searchValueService, $http){
		$scope.background = 'resultPage';
		$scope.$on('data_shared',function(){
              $scope.searchValue = searchValueService.getData();
        });
	}]);