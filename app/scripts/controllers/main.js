'use strict';

/**
 * @ngdoc function
 * @name stockCatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stockCatApp
 */
angular.module('stockCatApp')
  .controller('MainCtrl', function ($scope, $location, WatchlistService) {
    //populate watchlsits for dynamic nav links
    $scope.watchlists = WatchlistService.query();

    $scope.$watch(function(){
      return $location.path();
    }, function(path){
        if(_.contains(path, 'watchlist')){
          $scope.activeView = 'watchlist';
        }
        else{
          $scope.activeView = 'dashboard';
        }
    });
  });
