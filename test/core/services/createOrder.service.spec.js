describe('createOrderService',function(){
	var createOrderService,
		cookieHandlerService,
		traderService;

	beforeEach(module('app.core'));

	beforeEach(function(){
		traderService = {
			instruments  : jasmine.createSpy(),
			createOrder  : jasmine.createSpy()
		};

		module(function($provide){
			$provide.value('traderService',traderService);
		})
	})

	beforeEach(function(){
		cookieHandlerService = {
			getLoggedUser  : function(){
				return {
					id : 'mj'
				};
			}
		};

		module(function($provide){
			$provide.value('cookieHandlerService',cookieHandlerService);
		})
	})

	beforeEach(function(){
		inject(function(_createOrderService_,_traderService_,_cookieHandlerService_){
			createOrderService = _createOrderService_;
			traderService = _traderService_;
			cookieHandlerService = _cookieHandlerService_;
		})

	})

	it('should be defined',function(){
		expect(createOrderService).toBeDefined();
	})

	it('should call traderService for instruments',function(){
		expect(traderService.instruments).toHaveBeenCalled();
	})
})