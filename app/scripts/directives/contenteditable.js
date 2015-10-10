'use strict';

var NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;

/**
 * @ngdoc directive
 * @name stockCatApp.directive:contenteditable
 * @description
 * # contenteditable
 */
angular.module('stockCatApp')
  .directive('contenteditable', function () {
    return {
      restrict: 'A',
      require: 'ngModel',//get a hold of ngController
      link: function postLink($scope, $element, $attrs, ngModelCtrl) {
        //do nothing if there is no ngModel
        if(!ngModelCtrl){return;}

        var read = function(){
          var value = $element.html();
          if($attrs.type === 'number' && !NUMBER_REGEXP.test(value)){
            ngModelCtrl.$render();
          }
          else{
            ngModelCtrl.$setViewValue(value);
          }
        };

        //specify how UI should be updated
        ngModelCtrl.$render = function(){
          $element.html(ngModelCtrl.$viewValue || '');
        };

        // Add custom parser based input type (only `number` supported)
        // This will be applied to the $modelValue
        if ($attrs.type === 'number') {
          ngModelCtrl.$parsers.push(function (value) {
            return parseFloat(value);
          });
        }

        // Listen for change events to enable binding
        $element.on('blur keyup change', function() {
          $scope.$apply(read);
        });




      }

    };
  });
