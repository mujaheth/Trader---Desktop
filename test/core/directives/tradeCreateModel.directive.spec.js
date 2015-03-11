// describe('at -tradecreatemodel : Directive', function(){
// 	'use strict';

// 	var scope,
// 	    compile,
// 	    element;

// 	beforeEach(module('app.core'));

// 	beforeEach(module('src/trader/templates/tradeCreateModel.html'));

// 	beforeEach(function(){
// 	 	 inject(function(_$rootScope_,_$compile_){
// 	 	 	scope = _$rootScope_.$new();
// 			compile = _$compile_;

// 			element = '<div at-tradecreatemodel></div>' ; 

// 			element = compile(element)(scope);

// 			scope.$digest();

// 	 	 })
// 	 })

// 	it('should check the form',function(){
// 		var isolated = element.isolateScope();
// 		isolated.tradeNum = 'abcd';

// 	})
// })