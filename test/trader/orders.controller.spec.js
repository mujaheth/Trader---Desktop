describe('OrdersController',function(){
	var OrdersController,
		OrdersControllerScope,
		traderService,
		socketioService,
		deferred,
		$q;

	beforeEach(module('app.trader'));

	beforeEach(function(){
		socketioService = {
			get :  function($rootScope){
			    var obj = {}
			    obj.events = {}
			    obj.emits = {}

			    // intercept 'on' calls and capture the callbacks
			    obj.on = function(eventName, callback){
			      if(!this.events[eventName]) this.events[eventName] = []
			      this.events[eventName].push(callback)
			    }

			    // intercept 'emit' calls from the client and record them to assert against in the test
			    obj.emit = function(eventName){
			      var args = Array.prototype.slice.call(arguments,1)
			      console.log('emit');
			      if(!this.emits[eventName])
			        this.emits[eventName] = []
			      this.emits[eventName].push(args)
			    }

			    //simulate an inbound message to the socket from the server (only called from the test)
			    obj.receive = function(eventName){
			      var args = Array.prototype.slice.call(arguments,1)

			      if(this.events[eventName]){

			        angular.forEach(this.events[eventName], function(callback){
			          $rootScope.$apply(function() {

			            callback.apply(this, args)
			          })
			        })
			      }
			    }

			    return obj;
            }
		};

		module(function($provide){
			$provide.value('socketioService',socketioService);
		})
	});

	beforeEach(function(){
		traderService = {
			orders : jasmine.createSpy()
		};

		module(function($provide){
			$provide.value('traderService',traderService);
		})
	})

	beforeEach(function(){
		inject(function(_traderService_,_socketioService_,_$rootScope_,_$controller_,_$q_){
			traderService = _traderService_;
			socketioService = _socketioService_;
			OrdersControllerScope = _$rootScope_.$new();
			$controller = _$controller_;
			$q = _$q_;

			 deferred = $q.defer();
	            deferred.resolve([{
	                id: 1,
	            }]);

            traderService.orders.and.returnValue(deferred.promise);

			OrdersController = $controller('OrdersController',{
				$scope : OrdersControllerScope,
				traderService : traderService,
				socketioService : socketioService
			});

			socketioService.get(OrdersControllerScope).on('socket:orderCreatedEvent',function(){
				return {
					id : 2
				}
			})

			OrdersControllerScope.$digest();


		})
	});

	it('should be defined',function(){
		expect(OrdersController).toBeDefined();
	})

	it('should get the orders' , function(){

		expect(OrdersController.orders.$$state.value).toEqual([{
	                id: 1
	            }]);

		expect(traderService.orders).toHaveBeenCalled();
	})

	it('should able to listen to ordercreated event' , function(){

		socketioService.get(OrdersControllerScope).emit('socket:orderCreatedEvent');

	})

})