'use strict';

/**
 * @ngdoc function
 * @name App.controller:InboxCtrl
 * @description
 * # InboxCtrl
 * Controller of the App
 */
angular.module('App')
  .controller('InboxCtrl', function($scope, $timeout, $mdSidenav, $log, $http, $rootScope,$mdDialog , MailboxPassword) {
    $scope.toggleLeft = buildDelayedToggler('left');
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    $scope.menu = [{
      link: '',
      title: 'Inbox',
      icon: 'inbox'
    },{
      link: '',
      title: 'Starred',
      icon: 'star'
    },{
      link: '',
      title: 'Spam',
      icon: 'folder'
    },{
      link: '',
      title: 'Important',
      icon: 'exclamation-circle'
    },{
      link: '',
      title: 'sent',
      icon: 'paper-plane'
    },{
      link: '',
      title: 'Trash',
      icon: 'trash'
    },{
      link: '',
      title: 'Friends',
      icon: 'users'
    }];

    $scope.selected = [];

    $scope.query = {
      order: 'name',
      limit: 5,
      page: 1
    };


    $scope.msgs = [];

    $scope.count = $scope.msgs.length;


    $scope.onPaginate = function(page, limit) {
      console.log('Scope Page: ' + $scope.query.page + ' Scope Limit: ' + $scope.query.limit);
      console.log('Page: ' + page + ' Limit: ' + limit);

      $scope.promise = $timeout(function() {

      }, 2000);
    };

    $scope.deselect = function(item) {
      // console.log(item.name, 'was deselected');
    };

    $scope.select = function(item) {
      // console.log(item.name, 'was selected');
    };

    $scope.loadMails = function() {
      var Data = {
        password : MailboxPassword(),
        startIndex : '1' ,
        endIndex : '*'
      };
      console.log(Data);
      $scope.promise = $http({
        method : 'POST',
        url : '/mail/fetch/headers',
        data : Data
      }).success(function(Messages){
        var mail = {};
         func(Messages.length);

        Messages.forEach(function(msg){
          mail.from = msg.header.headers.from;
          mail.subject = msg.header.headers.subject;
          mail.date = msg.header.headers.date;
          console.log(mail.from + " " + mail.subject + " " + mail.date);
          $scope.msgs.push(mail);

        });

      }).error(function(err){
        console.log(err);
      });
    };
    $scope.loadMails();
function func(x) {$scope.count=x};



    $scope.onReorder = function(order) {

      // console.log('Scope Order: ' + $scope.query.order);
      // console.log('Order: ' + order);

      $scope.promise = $timeout(function() {

      }, 2000);
    };

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

    $scope.body = function(Index){
      var dat = {
        startIndex : Index,
      };
      $http({
        method:'post',
        url: '/mail/fetch/body',
        headers: {'Content-Type': 'application/json'},
        data: dat
      }).success(function(s){
        console.log(s);
        //alert("Recieving Data");
      }).error(function(e){
        console.error(e);
      });
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
