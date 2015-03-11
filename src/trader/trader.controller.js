(function(){
	'use strict';
	angular
		.module('app.trader')
		.controller('TraderController',TraderController);

    TraderController.$inject = ['cookieHandlerService','traderService','$state','createOrderService'];

    function TraderController(cookieHandlerService,traderService,$state,createOrderService){
    	var vm = this;

    	vm.loggedUserName = cookieHandlerService.getLoggedUser().name;
    	vm.createOrders  = createOrders;
    	vm.deleteAllOrders = deleteAllOrders;
    	vm.logOut   =  logOut;
    	
    	activate();

    	function activate(){
    		// checking if user is logged 
    		if(!vm.loggedUserName){
    			$state.transitionTo('login');
    		}
    		getRouterState();
    	}

		function getRouterState(){
			var href = $state.href($state.current.name);
			if(href === 'trader/table'){
				vm.activeIcon = 0;
			}else{
				vm.activeIcon = 1;
			}
		}

    	function createOrders(){
	    	var tradeNum = vm.tradeNum;

	        angular.element('#trademodal').modal('hide');

	        for(var i=1;i<=tradeNum;i++){
	        	createOrderService.createOrder();
	        }

		    vm.tradeNum = '';
    	}
        
        function deleteAllOrders(){
        	traderService.deleteOrders();
        }

        function logOut(){
        	cookieHandlerService.removeLoggedUser();
        }
    	

    }
})();