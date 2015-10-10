'use strict';

/**
 * @ngdoc directive
 * @name stockCatApp.directive:stkStockRow
 * @description
 * # stkStockRow
 */
angular.module('stockCatApp')
  .directive('stkStockRow', function ($timeout, QuoteService) {
    return {
      restrict: 'A',
      require: '^stkStockTable',
      scope:{
        stock: '=',
        isLast: '='
      },
      link: function postLink($scope, $element, $attrs, stockTableCtrl) {
        $element.tooltip({
          placement: 'left',
          title: $scope.stock.company.name
        });

        //?? why scope instead of $scope.row????
        stockTableCtrl.addRow($scope);
        //register this stock with the QuoteService
        QuoteService.register($scope.stock);

        $scope.$on('$destroy', function(){
          stockTableCtrl.removeRow($scope);
          QuoteService.deregister($scope.stock);
        });

        //if this is the last row, fetch data from service immediately
        if($scope.isLast){
          $timeout(QuoteService.fetch);
        }

        $scope.$watch('stock.values', function(){
          $scope.stock.marketValue = $scope.stock.shares * $scope.stock.lastPrice;
          $scope.stock.dayChange = $scope.stock.shares * parseFloat($scope.stock.change);
          $scope.stock.save();
        });

      }
    };
  });
