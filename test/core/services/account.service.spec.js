describe('accountService',function(){
	var accountService,
		$http,
		$location,
		exception;

	beforeEach(module('app.core'));

	beforeEach(function(){
		inject(function(_accountService_,_$httpBackend_,_$location_){
			accountService = _accountService_;
			$http  = _$httpBackend_;
			$location = _$location_;
		})
	})

	it('should be defined',function(){
		expect(accountService).toBeDefined();
	})

	it('should make a success call', function(){
		var result;

		$http.expectGET('http://localhost:8080/account').respond(200,{dummy : 'dummy'});

		accountService.getAccount()
			.then(function(data){
				result = data;
			});

		$http.flush();
		expect(result).toEqual({dummy : 'dummy'});

	})

	it('should execute catch block for an error',function(){
		var result,
			promise;

		spyOn($location , 'url');

		$http.expectGET('http://localhost:8080/account').respond(500,{dummy : 'dummy'});

		var promise = accountService.getAccount();

		promise.then(function(data){
			result = data;
		})

		$http.flush();

		expect(result).not.toBeDefined();

		expect($location.url).toHaveBeenCalledWith('/');

	})
})