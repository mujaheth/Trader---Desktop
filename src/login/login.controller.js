(function(){
	'use strict';

	angular
		.module('app.login')
		.controller('LoginController',LoginController);

	LoginController.$inject = ['traderService','cookieHandlerService'];

	/* @ngInject */
	function LoginController(traderService,cookieHandlerService) {
        var vm = this;

        vm.userNames = [];
		vm.header    = 'Log In';
		vm.defaultSelect = 'Chose a user name';
		vm.loginClickState = 'trader.table';
		vm.setLoggedUser = setLoggedUser;


		activate();


		function activate(){
			 getUserNames();
		}

		function getUserNames(){
			vm.userNames = traderService.users();
		}

		function setLoggedUser(){
			cookieHandlerService.setLoggedUser(vm.loggedUser);
		}
	}
})();