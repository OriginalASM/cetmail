'use strict';

/**
 * @ngdoc function
 * @name App.controller:InitCtrl
 * @description
 * # InitCtrl
 * Controller of the App
 */
angular.module('App')
  .controller('InitCtrl', function ($rootScope, $location, $q, $http , inbox) {

    $rootScope.mailboxes = $rootScope.mailboxes || [] ;
    console.log('init peerformed');

    // important operations
    var fetchMailboxes = function(){
      var fed = $q.defer();
      $http({
        method: 'GET',
        url: '/mail/fetch/mailboxes'
      }).success(function(data) {
        try {
          data.children.forEach(function(element, index) {
            element.title = element.name.toLowerCase();
            if (element.title == 'inbox')
              element.icon = 'inbox';
            else if (element.title == 'spam')
              element.icon = 'folder';
            else if (element.title == 'sent')
              element.icon = 'paper-plane';
          });
          fed.resolve(data.children);
        } catch (e) {
          console.log(e);
          fed.reject(e);
        }
      }).error(function(err) {
        fed.reject(err)
      });

      return fed.promise ;
    };
    $rootScope.fetchInbox = function(){
      inbox().then(function(Mails){
        $rootScope.msgs = Mails;
        console.log(Mails);
        $location.path('/mail/inbox/home');
        $rootScope.InboxIsReady = true;
      });
    };
    fetchMailboxes().then(function(a){
      $rootScope.mailboxes = a ;
      $rootScope.fetchInbox();
    },function(r){
      console.log(r);
    });



  });
