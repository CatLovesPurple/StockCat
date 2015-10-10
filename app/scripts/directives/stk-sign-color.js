'use strict';

/**
 * @ngdoc directive
 * @name stockCatApp.directive:stkSignColor
 * @description
 * # stkSignColor
 */
angular.module('stockCatApp')
  .directive('stkSignColor', function () {
    return {
      restrict: 'A',
      link: function postLink($scope, $element, $attrs) {
        $attrs.$observe('stkSignColor', function(newVal){

          var newSign = parseFloat(newVal);
          newSign > 0 ? $element[0].style.color = 'Green' :
              $element[0].style.color = 'Red';
        });
      }
    };
  });

