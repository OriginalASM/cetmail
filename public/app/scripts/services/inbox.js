'use strict';

/**
 * @ngdoc service
 * @name App.inbox
 * @description
 * # inbox
 * Service in the App.
 */
angular.module('App')
  .service('inbox', function($http, $q ,$sce,$location,$rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var Mails = [];
    //Class of Mail
    function Mail(Index) {
      this.index = Index;
      this.from_mail = {};
      this.reply_to = {};
      this.reply = function() { //functions yet to be implemented.
        console.log('Reply');
      };
      this.forward = function() {
        console.log('Forward');
      };
      this.fetch_body = function() {
        var a = this;
        $http({
          method: 'post',
          url: '/mail/fetch/body',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            startIndex: this.index
          }
        }).success(function(s) {
          a.from_mail.address = s[0].body.from[0].address;
          a.from_mail.name = s[0].body.from[0].name;
          a.ms = $sce.trustAsHtml(s[0].body.html);
          a.reply_to.address = s[0].envelope['reply-to'][0].address;
          a.reply_to.name = s[0].envelope['reply-to'][0].name;
          console.log(a);
          $location.path('/mail/inbox/v/' + a.index);
          console.log('Redirecting');
          $rootScope.currentMail = angular.copy(a);
        }).error(function(e) {
          console.error(e);
        });
      }
    };
    var main = function() {
      var q = $q.defer();

      $http({
        method: 'POST',
        url: '/mail/fetch/headers',
        data: { startIndex: 1, endIndex: '*' }
      }).success(function(Messages) {
        try {
          Messages.forEach(function(msg) {
            var mail = new Mail(parseInt(msg.index));
            mail.from_mail.address = msg.envelope.sender[0].address;
            mail.from_mail.name = msg.envelope.sender[0].name;
            mail.subject = msg.envelope.subject;
            mail.date = new Date(msg.envelope.date);
            mail.to = msg.envelope.to[0].address;
            mail.index = msg.index;
            if (msg.flags.indexOf("\\Seen") >= 0) {
              mail.seen = true;
            } else {
              mail.seen = false;
            }
            Mails.push(mail);
          });
          q.resolve(Mails);
        } catch (e) {
          console.log(e);
          q.reject(e);
        }
      }).error(function(e) {
        console.log(e);
        q.reject(e);
      });
      return q.promise;
    };
    return main;
  });
