(function(){
	'use strict';
	angular
		.module('app.trader')
		.controller('OrdersController',OrdersController);

    OrdersController.$inject = ['traderService','$scope','socketioService'];

    function OrdersController(traderService,$scope,socketioService){
    	var vm = this;
    	 socketioService = socketioService;

    	vm.orders  = [];


    	activate();

    	function activate(){
    		getOrders();
    		socketHandler();
    	}

    	
    	function getOrders(){
    		vm.orders = traderService.orders();
    	}

    	function socketHandler(){

		  	function updateModels(placement){
		  		var length = vm.orders.length;
			          for(var i=0;i<length;++i) {
			              var order = vm.orders[i];
			              if ( order.id === placement.orderId) {
			              	if(placement.quantityPlaced){
			              	    order.quantityPlaced += placement.quantityPlaced;
			              	}
			              	if(placement.quantityExecuted){
			              	    order.quantityExecuted += placement.quantityExecuted;
			              	}
				     		order.status = placement.status;
			              }
			          }
		  	}

			$scope.$on('socket:orderCreatedEvent', function(ev,order) {
			    vm.orders.push(order);
		    });

			$scope.$on('socket:placementCreatedEvent', function(ev,placement) { 
				updateModels(placement);
			});

			$scope.$on('socket:executionCreatedEvent', function(ev,placement) {
				updateModels(placement);
			});
			$scope.$on('socket:allOrdersDeletedEvent', function() {
		        vm.orders = [];
			});

	    }

    }
})();