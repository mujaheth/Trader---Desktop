/* jshint -W024 */
(function(){
	 'use strict';

	 angular
	     .module('app.core')
	     .factory('socketioService',socketioService);

	 socketioService.$inject  = ['socketFactory','api','$window'];

	 function socketioService(socketFactory,api,$window){
	 	var myIoSocket = $window.io.connect(api);

		  var mySocket = socketFactory({
		    ioSocket: myIoSocket
		  });

		mySocket.forward(['orderCreatedEvent',
						  'placementCreatedEvent',
						  'executionCreatedEvent',
						  'allOrdersDeletedEvent']);

		return mySocket;

	 }
})();