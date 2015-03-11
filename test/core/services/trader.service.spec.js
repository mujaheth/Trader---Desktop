describe('traderService',function(){
	var traderService,
	    $resource;

	 beforeEach(module('app.core'));

	 beforeEach(function(){
	 	 inject(function(_traderService_,_$httpBackend_){
	 	 	traderService = _traderService_;
	 	 	$resource = _$httpBackend_;
	 	 })
	 })

	 it('should be defined',function(){
	 	expect(traderService).toBeDefined();
	 })

	 it('should be able to get users',function(){
	 	var result;

	 	$resource.expectGET('http://localhost:8080/users').respond(200,[{user : 'john lenon'}]);

	 	result = traderService.users();

	 	$resource.flush();

	 	expect(result[0].user).toEqual('john lenon');
	 })

	 it('should be able to get instruments',function(){
	 	var result;

	 	$resource.expectGET('http://localhost:8080/instruments').respond(200,[{company : 'Apple'}]);

	 	result = traderService.instruments();

	 	$resource.flush();

	 	expect(result[0].company).toEqual('Apple');
	 })

	 it('should be able to get orders',function(){
	 	var result;

	 	$resource.expectGET('http://localhost:8080/orders').respond(200,[{id : 2}]);

	 	result = traderService.orders();

	 	$resource.flush();

	 	expect(result[0].id).toEqual(2);
	 })

	 it('should be able to delete orders',function(){
	 	var result;

	 	$resource.expectDELETE('http://localhost:8080/orders').respond(200);

	 	traderService.deleteOrders();

	 	$resource.expectGET('http://localhost:8080/orders').respond(200,[]);

	 	result = traderService.orders();

	 	$resource.flush();

	 	expect(result.length).toEqual(0);
	 })

	 it('should be able to post order',function(){
	 	var result,
	 		order = {
	 			id : 2,
	 			quantity : 1000
	 		};

	 	$resource.expectPOST('http://localhost:8080/orders',order).respond(200,'');

	 	result = traderService.createOrder(order);

	 	$resource.flush();

	 	expect(result.id).toBe(2);
	 })
})