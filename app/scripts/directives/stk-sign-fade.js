'use strict';

/**
 * @ngdoc directive
 * @name stockCatApp.directive:stkSignFade
 * @description
 * # stkSignFade
 */
angular.module('stockCatApp')
  .directive('stkSignFade', function ($animate) {
    return {
      restrict: 'A',
      link: function postLink($scope, $element, $attrs) {
        var oldValue = null;

        $attrs.$observe('stkSignFade', function(newVal){
          if(oldValue && oldValue == newVal){
            return;
          }

          var oldPrice = parseFloat(oldValue);
          var newPrice = parseFloat(newVal);
          oldValue = newVal;

          //if both value are valid
          if(oldPrice && newPrice){
            var direction = newPrice-oldPrice > 0 ? 'up' : 'down';
            $animate.addClass($element, 'change-' + direction, function(){
              $animate.removeClass($element, 'change-' + direction);
            });
          }

        });

      }
    };
  });
