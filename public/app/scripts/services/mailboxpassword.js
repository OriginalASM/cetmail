'use strict';

/**
 * @ngdoc service
 * @name App.MailboxPassword
 * @description
 * # MailboxPassword
 * Service in the App.
 */
angular.module('App')
  .service('MailboxPassword', function ($rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return function(){
      /*if(!$rootScope.pass){
        var result = window.prompt("Provide Inbox Password");
        $rootScope.pass = result ;
        return result ;
      }else
        return $rootScope.pass ;
       */
        return null ;
      }
  });
