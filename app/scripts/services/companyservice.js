'use strict';

/**
 * @ngdoc service
 * @name stockCatApp.CompanyService
 * @description
 * # CompanyService
 * Service in the stockCatApp.
 */
angular.module('stockCatApp')
  .service('CompanyService', function CompanyService($resource) {
    return $resource('companies.json');
  });
