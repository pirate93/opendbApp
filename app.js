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

movieApp.factory('searchValueService',function($rootScope, $timeout, $http){
  	var service = {};

  	service.data = '';
  	service.others = '';
  	var self = this;
  	service.sendData = function(data){
     	return $http.get("http://www.omdbapi.com/?t="+data+"&tomatoes=true&plot=full&r=json");
  	};
  	service.sendOthers = function (data) {
  		return $http.get("http://www.omdbapi.com/?s="+data);
  	}
  	service.getData = function(){
    	return this.data;
  	};
  	console.log(service);
  	return service;
	});

movieApp.controller('MainController', ['$scope', function($scope){
		$scope.background = ' page mainPage';
	}]);

movieApp.controller('SearchController', ['$scope', 'searchValueService', '$timeout', '$rootScope',function($scope, searchValueService, $timeout, $rootScope){
		$scope.background = "page searchPage";
		$scope.searchValue = "";
		$scope.send = function () {
			searchValueService.sendData($scope.searchValue)
				.then(function (response) {
					searchValueService.data = response.data;
					searchValueService.sendOthers($scope.searchValue)
						.then(function (response) {
							searchValueService.others = response.data.Search;
						$timeout(function(){
			        	$rootScope.$broadcast('data_shared');
			      		},500);
					});
				});
		}
		
	}]);

movieApp.controller('ResultController', ['$scope', 'searchValueService', '$http',function($scope, searchValueService, $http){
		$scope.background = '';
		$scope.$on('data_shared',function(){
            $scope.searchValue = searchValueService.getData();
            $scope.others = searchValueService.others;
        });
	}]);