(function() {
    'use strict';

    angular.module('app.core', [
        // Angular modules
        'ngAnimate', 'ngSanitize','ngCookies','ngResource',

        // Our reusable framework
        'fw.exception', 'fw.logger', 'fw.router','fw.cookieHandler',

        // 3rd Party modules
        'ui.router','btford.socket-io'
    ]);
})();
