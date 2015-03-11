(function(){
     
	'use strict';

         angular
           .module('fw.cookieHandler')
           .factory('cookieHandlerService',cookieHandlerService);

     cookieHandlerService.$inject = ['$cookieStore'];
     /* @ngInject */

     function cookieHandlerService($cookieStore){
          var service =  {
               setLoggedUser : setLoggedUser,
               getLoggedUser  : getLoggedUser,
               removeLoggedUser : removeLoggedUser
     	    };

          return service;

          function setLoggedUser(user){
               $cookieStore.put('loggedUserName', user.name);
               $cookieStore.put('loggedUserId', user.id);
          }

          function getLoggedUser(){
               var user = {
           			name : $cookieStore.get('loggedUserName'),
           			  id : $cookieStore.get('loggedUserId')
           		};
               return user;
          }

          function removeLoggedUser(){
               $cookieStore.remove('loggedUserName');
               $cookieStore.remove('loggedUserId');
          }
     }


})();