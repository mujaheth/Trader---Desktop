// Usage
// <div at-tradecreatemodel></div>
/* jshint -W126 */

(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('atTradecreatemodel', TradeCreateModelDirective);

    // TradeCreateModelDirective.$inject = [''];

    /* @ngInject */
    function TradeCreateModelDirective(){

        var directive = {
            templateUrl : '../../trader/templates/tradeCreateModel.html',
            restrict: 'A',
            scope: true,
            replace : true
        };

        return directive;
    }
})();
