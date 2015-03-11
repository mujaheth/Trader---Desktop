describe('LoginController',function(){
	var LoginController,
		LoginControllerScope,
		traderService,
		cookieHandlerService,
		$http,
		deferred,
		$q;

	beforeEach(module('app.login'));

	beforeEach(function(){
		traderService = {
			users : jasmine.createSpy()
		};

		module(function($provide){
			$provide.value('traderService',traderService);
		})
	})

	beforeEach(function(){
		cookieHandlerService = {
			setLoggedUser : jasmine.createSpy()
		};

		module(function($provide){
			$provide.value('cookieHandlerService',cookieHandlerService);
		})
	})

	beforeEach(function(){
		inject(function(_traderService_,_$q_,_$rootScope_,_$controller_,_cookieHandlerService_){
			$q = _$q_;
			LoginControllerScope = _$rootScope_.$new();
			traderService = _traderService_;
			$controller = _$controller_;
			cookieHandlerService = _cookieHandlerService_;

			    deferred = $q.defer();
	            deferred.resolve({
	                user: 'mj'
	            });

            traderService.users.and.returnValue(deferred.promise);

			LoginController = $controller('LoginController',{
				$scope : LoginControllerScope,
				traderService : traderService,
				cookieHandlerService : cookieHandlerService
			})

			LoginControllerScope.$root.$digest();

		})
	})

	it('should be defined',function(){
		expect(LoginController).toBeDefined();
	})

	it('should able to get users',function(){

		expect(LoginController.userNames.$$state.value).toEqual({
	                user: 'mj'
	            });

		expect(traderService.users).toHaveBeenCalled();
	})

	it('should able to set user',function(){

		LoginController.setLoggedUser();

		expect(cookieHandlerService.setLoggedUser).toHaveBeenCalled();
	})



})