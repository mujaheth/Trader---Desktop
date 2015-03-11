describe('TraderController',function(){
	var TraderController,
		TraderControllerScope,
		traderService,
		cookieHandlerService,
		createOrderService,
		$state;

	beforeEach(module('app.trader'));

	beforeEach(function(){
		traderService = {
			deleteOrders : jasmine.createSpy()
		};

		module(function($provide){
			$provide.value('traderService',traderService);
		})
	})

	beforeEach(function(){
		cookieHandlerService = {
			removeLoggedUser : jasmine.createSpy(),
			getLoggedUser : function(){
				return {
					name : 'mj'
				}
			}
		};

		module(function($provide){
			$provide.value('cookieHandlerService',cookieHandlerService);
		})
	})
	beforeEach(function(){
		createOrderService = {
			createOrder : jasmine.createSpy()
		};

		module(function($provide){
			$provide.value('createOrderService',createOrderService);
		})
	})

	beforeEach(function(){
		inject(function(_traderService_,_$rootScope_,_$controller_,_$state_,_cookieHandlerService_,_createOrderService_){
			TraderControllerScope = _$rootScope_.$new();
			traderService = _traderService_;
			$controller = _$controller_;
			$state = _$state_;
			cookieHandlerService = _cookieHandlerService_;
			createOrderService = _createOrderService_;

			TraderController = $controller('TraderController',{
				$scope :TraderControllerScope,
				traderService : traderService,
				$state : $state,
				cookieHandlerService : cookieHandlerService,
				createOrderService : createOrderService
			})

			spyOn(cookieHandlerService , 'getLoggedUser').and.callThrough();

			TraderControllerScope.$root.$digest();

		})
	})

	it('should be defined',function(){
		expect(TraderController).toBeDefined();

		expect(TraderController.loggedUserName).toBe('mj');
	});

	it('should able to call createOrder Service',function(){
		TraderController.tradeNum = 10;

		TraderController.createOrders();

		expect(createOrderService.createOrder.calls.count()).toEqual(10);
	});

	it('should able to call traderService for deleting orders',function(){
		TraderController.deleteAllOrders();

		expect(traderService.deleteOrders).toHaveBeenCalled();
	});

	it('should able to call cookieservice for logging out user',function(){
		TraderController.logOut();

		expect(cookieHandlerService.removeLoggedUser).toHaveBeenCalled();
	});





})