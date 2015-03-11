(function(){
	'use strict';

	 angular
	     .module('app.core')
	     .factory('createOrderService',createOrderService);

    createOrderService.$inject = ['cookieHandlerService','traderService'];

    function createOrderService(cookieHandlerService,traderService){
    	var instruments;

    	activate();

    	var service = {
    		createOrder : createOrder
    	}

        return service;

        function activate(){
        	getInstruments();
        }

        function getInstruments(){
		    	instruments = traderService.instruments();
		}

        function createOrder(){
        	var  sideArray = ['buy','sell'],
	             traderId  = cookieHandlerService.getLoggedUser().id;

        	var order = {};

        	order.side = sideArray[Math.floor(Math.random()+0.5)];

        	order.symbol = instruments[Math.floor(Math.random()*10+1)].symbol;

        	order.quantity  = Math.floor(Math.random()*10000+1);

        	order.limitPrice = (Math.random()*1000+1).toFixed(2);

        	order.traderId = traderId;

        	traderService.createOrder(order);

        }     

    }
})();