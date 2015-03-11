(function(){
	'use strict';
	angular
		.module('app.trader')
		.run(appRun);

	appRun.$inject = ['routerHelper'];
	 /* @ngInject */

	function appRun(routerHelper){
		routerHelper.configureStates(getStates(),'/trader/table');	
	}

	function getStates(){
		return [
		    {
				state : 'trader',
				config: {
                    url: '/trader',
                    templateUrl: 'trader/trader.html',
                    controller : 'TraderController',
                    controllerAs : 'vm',
                    title: 'trader',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-trader"></i> trader'
                    }
                }
            },
            {
				state : 'trader.table',
				config: {
                    url: '/table',
                    templateUrl: 'trader/templates/table.html',
                    controller : 'OrdersController',
                    controllerAs : 'vm',
                    title: 'table',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-table"></i> table'
                    }
                }
            },
            {
				state : 'trader.chart',
				config: {
                    url: '/chart',
                    templateUrl: 'trader/templates/chart.html',
                    controller : 'OrdersController',
                    controllerAs : 'vm',
                    title: 'chart',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-chart"></i> chart'
                    }
                }
            }
		] ; 
	}		
})();
