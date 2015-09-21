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
  	

    var loadModel = function(){
    	var model = {
    		watchlists: localStorage['stockCat.watchlists'] ? JSON.parse(localStorage['stockCat.watchlists']) : [],
    		nextId: localStorage['stockCat.nextId'] ? parseInt(localStorage['stockCat.nextId']) : 0
    	};

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
