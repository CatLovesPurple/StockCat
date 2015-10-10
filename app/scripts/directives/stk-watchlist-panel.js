'use strict';

/**
 * @ngdoc directive
 * @name directiveApp.directive:stkWatchlistPanel
 * @description a watchlist service
 * # stkWatchlistPanel
 */
angular.module('stockCatApp')
  .directive('stkWatchlistPanel', function ($location, $modal, $routeParams, WatchlistService) {
    return {
      templateUrl: 'views/templates/watchlist-panel.html',
      restrict: 'E',
      scope:{},
      link: function postLink($scope) {
      	$scope.watchlist = {};

        $scope.currentListId = $routeParams.listId;

        $scope.gotoList = function(listId){
          $location.path('watchlist/' + listId);
        };

      	var addListModal = $modal({
      		scope:$scope,
      		template:'views/templates/addlist-modal.html',
      		show: false
      	});

      	//bind service from service to this scope
      	$scope.watchlists = WatchlistService.query();

      	//display addlist modal
      	$scope.showModal = function(){
      		addListModal.$promise.then(addListModal.show);
      	};

      	$scope.createList = function(){
      		WatchlistService.save($scope.watchlist);
      		addListModal.hide();
      		$scope.watchlist = {};
      	};

      	$scope.deleteList = function(list){
      		WatchlistService.remove(list);
      		$location.path('/');
      	};
       }
      };
  });
