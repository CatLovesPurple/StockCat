'use strict';

/**
 * @ngdoc overview
 * @name stockCatApp
 * @description
 * # stockCatApp
 *
 * Main module of the application.
 */
angular
  .module('stockCatApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'mgcrea.ngStrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/watchlist/:listId', {
        templateUrl: 'views/watchlist.html',
        controller: 'WatchlistCtrl'
      })
      .otherwise({
        redirectTo: '/dashboard'
      });
  });
