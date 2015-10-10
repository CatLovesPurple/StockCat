'use strict';

/**
 * @ngdoc function
 * @name stockCatApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the stockCatApp
 */
angular.module('stockCatApp')
  .controller('DashboardCtrl', function ($scope, WatchlistService, QuoteService) {
      var unregisterHandlers = [];
      $scope.watchlsits = WatchlistService.query();
      $scope.cssStyle = 'height:300px;';

      var formatters = {
        number: [{
            columnNum: 1,
            prefix: '$'
        }]
      };

      var updateCharts = function(){

        var donutChart = {
          type: 'PieChart',
          displayed: true,
          data: [['Watchlist', 'Market Value']],
          options: {
            title: 'Market Value by Watchlist',
            legend: 'none',
            pieHole: 0.4
          },
          formatters: formatters
        }


        //columnChart
        var columnChart = {
          type:'ColumnChart',
          displayed: true,
          data: [['Watchlist', 'Change', {role: 'style'}]],
          options: {
            title: 'Day change by Watchlist',
            legend: 'none',
            animation: {
              duration: 1500,
              easing: 'linear'
            },
            formatters: formatters
          }
        };

        //push data to both charts
        _.each($scope.watchlists, function(watchlist){
          donutChart.data.push([watchlist.name, watchlist.marketValue]);
          columnChart.data.push([watchlist.name, watchlist.dayChange, watchlist.dayChange < 0 ? 'Red' : 'Green']);
        });

        $scope.donutChart = donutChart;
        $scope.columnChart = columnChart;
      };


      var reset = function(){
        QuoteService.clear();
        _.each($scope.watchlists, function(watchlist){
          _.each(watchlist.stocks, function(stock){
            QuoteService.register(stock);
          });
        });


        _.each(unregisterHandlers, function(unregister){
          unregister();
        });

        _.each($scope.watchlists, function(wc){
          var unregister = $scope.$watch(function(){
            return wc.marketValue;
          }, function(){
            recalculate();
          });

          unregisterHandlers.push(unregister);
        });
      };


      var recalculate = function(){
        $scope.marketValue = 0;
        $scope.dayChange = 0;

        _.each($scope.watchlists, function(wc){
          $scope.marketValue += wc.marketValue ? wc.marketValue : 0;
          $scope.dayChange += wc.dayChange ? wc.dayChange : 0;
        });

        updateCharts();
      };

      $scope.$watch('watchlists.length', function(){
        reset();
      });
  });
