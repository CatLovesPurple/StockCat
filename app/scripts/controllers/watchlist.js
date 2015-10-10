'use strict';

/**
 * @ngdoc function
 * @name stockCatApp.controller:WatchlistCtrl
 * @description
 * # WatchlistCtrl
 * Controller of the stockCatApp
 */
angular.module('stockCatApp')
  .controller('WatchlistCtrl', function ($scope, $routeParams, $modal, WatchlistService, CompanyService) {

    // Initializations
    $scope.companies = CompanyService.query();
    $scope.watchlist = WatchlistService.query($routeParams.listId);
    $scope.stocks = $scope.watchlist.stocks;
    $scope.newStock = {};
    //console.log($scope.watchlist);

    var addStockModal = $modal({
      scope: $scope,
      template: 'views/templates/addstock-modal.html',
      show: false
    });

    $scope.showStockModal = function () {
      addStockModal.$promise.then(addStockModal.show);
    };

    $scope.addStock = function () {
      //console.log($scope.watchlist);
      $scope.watchlist = WatchlistService.query($routeParams.listId);

      $scope.watchlist.addStock({
        listId: $routeParams.listId,
        company: $scope.newStock.company,
        shares: $scope.newStock.shares
      });
      addStockModal.hide();
      $scope.newStock = {};

    };
  });
