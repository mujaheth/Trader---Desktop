/* jshint -W024 */
(function(){
	 'use strict';

	 angular
	     .module('app.core')
	     .factory('traderService',traderService);

	 traderService.$inject  = ['api','$resource'];

	 function traderService(api,$resource){

	 		return  $resource(api + ':serviceType',{},{
			 			users : {
			 				method : 'GET',
			 				isArray : true,
			 				params:{serviceType:'users'}
			 			},
			 			instruments : {
			 				method : 'GET',
			 				isArray : true,
			 				params:{serviceType:'instruments'}
			 			},
			 			orders : {
			 				method : 'GET',
			 				isArray : true,
			 				params:{serviceType:'orders'}
			 			},
			 			createOrder : {
			 				method : 'POST',
			 				params:{serviceType:'orders'},
			 				headers: {  
					           Accept : 'text/plain; charset=utf-8',
		                      'Content-Type': 'application/json; charset=utf-8'
					        },
			 				transformRequest: function(data) {
							  return JSON.stringify(data);
							}
			 			},
			 			deleteOrders : {
			 				method : 'DELETE',
			 				params:{serviceType:'orders'}
			 			}

	 		        });
	 }


})();