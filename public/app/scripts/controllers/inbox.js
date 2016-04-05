'use strict';

/**
 * @ngdoc function
 * @name App.controller:InboxCtrl
 * @description
 * # InboxCtrl
 * Controller of the App
 */
angular.module('App')
  .controller('InboxCtrl', function($scope, $timeout, $mdSidenav, $log, $http, $rootScope, $mdDialog, MailboxPassword) {
    $scope.toggleLeft = buildDelayedToggler('left');
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */

    $scope.menu = [{
      link: '',
      title: 'Inbox',
      icon: 'inbox'
    }, {
      link: '',
      title: 'Inbox',
      icon: 'inbox'
    }, {
      link: '',
      title: 'Inbox',
      icon: 'inbox'
    }, {
      link: '',
      title: 'Inbox',
      icon: 'inbox'
    }, {
      link: '',
      title: 'Inbox',
      icon: 'inbox'
    }, {
      link: '',
      title: 'Inbox',
      icon: 'inbox'
    }];

    $scope.selected = [];

    $scope.query = {
      order: 'index',
      limit: 10,
      page: 1
    };


    $scope.msgs = [];
    $scope.navs = [];

    $scope.deselect = function(item) {
      // console.log(item.name, 'was deselected');
    };

    $scope.select = function(item) {
      // console.log(item.name, 'was selected');
    };

    $scope.loadMails = function() {
      $scope.msgs = []; // empty old list
      $scope.showmail=false;
      var Data = {
        password: MailboxPassword(),
        startIndex: '1',
        endIndex: '*'
      };
      console.log(Data);
      $scope.promise = $http({
        method: 'POST',
        url: '/mail/fetch/headers',
        data: Data
      }).success(function(Messages) {

        number_of_mails(Messages.length);

        try {
          Messages.forEach(function(msg) {
            var mail = {};
            mail.index = parseInt(msg.index);
            mail.from = msg.envelope.sender[0].address;
            mail.subject = msg.envelope.subject;
            mail.date = msg.envelope.date;
            mail.to = msg.envelope.to[0].address;
            console.log(mail.index + " " + mail.from + " " + mail.subject + " " + mail.date);
            $scope.msgs.push(mail);
          });
        } catch (e) {
          console.log(e);
        }
      }).error(function(err) {
        console.log(err);
      });


      $scope.promise = $http.get('/users/api/getuser')
        .success(function(data) {
          $scope.user = data;
          console.log('User logged in');
        }).error(function(err) {
          console.log(err);

        });


      $scope.promise = $http({
        method: 'GET',
        url: '/mail/fetch/mailboxes',

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
          $scope.menu = data.children;
        } catch (e) {
          console.log(e);
        }

      }).error(function(err) {
        console.log(err);
      });
    };


    function number_of_mails(x) {
      $scope.count = x;
    }

    $scope.status = function() {
      $scope.resp = 'Your message was sent successfully';
      console.log($scope.resp);
      console.log("I will print the success msg ");

    };

    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
          args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function() {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function() {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }

    $scope.expandedMail = {
      visible : false,
      from_mail : {} ,
      reply_to : {} ,
      fetch_body : function(Index) {
        this.visible = true;
        $http({
          method: 'post',
          url: '/mail/fetch/body',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            startIndex: Index
          }
        }).success(function(s) {
          console.log(s);
          $scope.expandedMail.subject=s[0].body.headers.subject;
          console.log('Subject : ' + $scope.expandedMail.subject);
          $scope.expandedMail.date=s[0].body.date;
          console.log('Date : ' + $scope.expandedMail.date);
          $scope.expandedMail.from_mail.address= s[0].body.from[0].address;
          console.log('From mail: ' + $scope.expandedMail.from_mail.address);
          $scope.expandedMail.from_mail.name= s[0].body.from[0].name;
          console.log('From Name: ' + $scope.expandedMail.from_mail.name);
          $scope.expandedMail.to= s[0].body.to;
          console.log('To mail: ' + $scope.expandedMail.to[0].address + ' ' + $scope.expandedMail.to[0].name);
          $scope.expandedMail.ms= s[0].body.html;
          console.log('Body: ' + $scope.expandedMail.to);
          $scope.expandedMail.reply_to.address= s[0].envelope['reply-to'][0].address;
          console.log('Reply to address: ' + $scope.expandedMail.reply_to.address);
          $scope.expandedMail.reply_to.name= s[0].envelope['reply-to'][0].name;
          console.log('Reply to name: ' + $scope.expandedMail.reply_to.name);
          //alert("Recieving Data");
        }).error(function(e) {
          console.error(e);
        });
      },
    };


  })
  .controller('LeftCtrl', function($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function() {
      $mdSidenav('left').close()
        .then(function() {
          $log.debug("close LEFT is done");
        });
    };
  });
