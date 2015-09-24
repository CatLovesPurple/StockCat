'use strict';

/**
 * @ngdoc function
 * @name stockCatApp.controller:WatchlistCtrl
 * @description
 * # WatchlistCtrl
 * Controller of the stockCatApp
 */
angular.module('stockCatApp')
  .controller('WatchlistCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
