'use strict';

/**
 * @ngdoc service
 * @name stockCatApp.WatchlistService
 * @description
 * # WatchlistService
 * Service in the stockCatApp.
 *9-21-2015
 */
angular.module('stockCatApp')
  .service('WatchlistService', function WatchlistService() {
  	var StockModel = {
      save : function () {
        var watchlist = findById(this.listId);
        watchlist.recalculate();
        saveModel();
      }
    };

    var WatchlistModel = {
      addStock: function (stock) {
        var existingStock = _.find(this.stocks, function (s) {
          return s.company.symbol === stock.company.symbol;
        });
        if (existingStock) {
          existingStock.shares += stock.shares;
        } else {
          _.extend(stock, StockModel);
          this.stocks.push(stock);
        }
        this.recalculate();
        saveModel();
      },
      removeStock:function(stock){
        _.remove(this.stocks, function(){
          return stock.company.symbol === s.company.symbol;
        });
        this.recalculate();
        saveModel();
      },
      recalculate: function(){
        var calcs = _.reduce(this.stocks, function(calcs, stock){
          calcs.shares += stock.shares;
          calcs.marketValue += stock.marketValue;
          calcs.dayChange += stock.datChange;
          return calcs;
        },{ shares: 0, marketValue: 0, dayChange: 0 });

        this.shares = calcs.shares;
        this.marketValue = calcs.marketValue;
        this.dayChange = calcs.dayChange;
      }
    };

    var loadModel = function(){
    	var model = {
    		watchlists: localStorage['stockCat.watchlists'] ? JSON.parse(localStorage['stockCat.watchlists']) : [],
    		nextId: localStorage['stockCat.nextId'] ? parseInt(localStorage['stockCat.nextId']) : 0
    	};
      _.each(model.watchlists, function(watchlist){
        _.extend(watchlist, WatchlistModel);
        _.each(watchlist.stocks, function(stock){
          _.extend(stock, StockModel);
        });
      });

    	return model;
    };

    var saveModel = function(){
    	localStorage['stockCat.watchlists'] = JSON.stringify(model.watchlists);
    	localStorage['stockCat.nextId'] = model.nextId;
    };


    var findById = function(listId){
    	return _.find(model.watchlists, function(watchlist){
    		return watchlist.id === parseInt(listId);
    	});
    };

    this.query = function(listId){
    	if(listId){
    		return findById(listId);
    	}
    	else{
    		return model.watchlists;
    	}
    };

    this.save = function(watchlist){
    	watchlist.id = model.nextId++ ;
      watchlist.stocks = [];
      _.extend(watchlist, WatchlistModel);
    	model.watchlists.push(watchlist);
    	saveModel();
    };

    this.remove = function(watchlist){
    	_.remove(model.watchlists, function(list){
    		return list.id === watchlist.id;
    	});
    	saveModel();
    };
    var model = loadModel();

  });
