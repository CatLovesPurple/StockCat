'use strict';

/**
 * @ngdoc function
 * @name stockCatApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the stockCatApp
 */
angular.module('stockCatApp')
  .controller('DashboardCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
