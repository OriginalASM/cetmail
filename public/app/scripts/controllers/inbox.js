'use strict';

/**
 * @ngdoc function
 * @name App.controller:InboxCtrl
 * @description
 * # InboxCtrl
 * Controller of the App
 */
angular.module('App')
  .controller('InboxCtrl', function($scope, $timeout, $mdSidenav, $log, $http, $rootScope,$mdDialog) {
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
        title: 'Starred',
        icon: 'star'
      }, {
        link: '',
        title: 'Spam',
        icon: 'folder'
      }, {
        link: '',
        title: 'Important',
        icon: 'exclamation-circle'
      }, {
        link: '',
        title: 'sent',
        icon: 'paper-plane'
      }, {
        link: '',
        title: 'Trash',
        icon: 'trash'
      },

      {
        link: '',
        title: 'Friends',
        icon: 'users'
      }



    ];




    $scope.selected = [];

    $scope.query = {
      order: 'name',
      limit: 5,
      page: 1
    };


    $scope.msgs = [{
      what: 'Brunch this weekend?',
      who: 'Lalu',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    }, {
      what: 'Summer BBQ',
      who: 'Rishav',
      when: '3:08PM',
      notes: "Wish I could come out but I'm out of town this weekend"
    }, {
      what: 'Oui Oui',
      who: 'Sandy',
      when: '3:08PM',
      notes: "Do you have Paris recommendations? Have you ever been?"
    }, {
      what: 'Birthday Gift',
      who: 'Sohini',
      when: '3:08PM',
      notes: "Have any ideas of what we should get Heidi for her birthday?"
    }, {
      what: 'Recipe to try',
      who: 'Ashu',
      when: '3:08PM',
      notes: "We should eat this: Grapefruit, Squash, Corn, and Tomatillo tacos"
    }, {
      what: 'Oui Oui',
      who: 'Sandy',
      when: '3:08PM',
      notes: "Do you have Paris recommendations? Have you ever been?"
    }, {
      what: 'Birthday Gift',
      who: 'Sohini',
      when: '3:08PM',
      notes: "Have any ideas of what we should get Heidi for her birthday?"
    }, {
      what: 'Recipe to try',
      who: 'Ashu',
      when: '3:08PM',
      notes: "We should eat this: Grapefruit, Squash, Corn, and Tomatillo tacos"
    }, {
      what: 'Brunch this weekend?',
      who: 'Lalu',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    }, {
      what: 'Summer BBQ',
      who: 'Rishav',
      when: '3:08PM',
      notes: "Wish I could come out but I'm out of town this weekend"
    }, {
      what: 'Oui Oui',
      who: 'Sandy',
      when: '3:08PM',
      notes: "Do you have Paris recommendations? Have you ever been?"
    }, {
      what: 'Birthday Gift',
      who: 'Sohini',
      when: '3:08PM',
      notes: "Have any ideas of what we should get Heidi for her birthday?"
    }];

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

    $scope.loadStuff = function() {
      $scope.promise = $timeout(function() {

      }, 2000);
    };

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

    }






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
      $scope.dat = {
        startIndex : Index,
        password : $rootScope.pass
      };
console.log($scope.dat);
      $http({
        method:'post',
        url: '/mail/fetch/body',
        headers: {'Content-Type': 'application/json'},
        data: $scope.dat
      }).success(function(s){
        console.log(JSON.parse(s));
        alert("Recieving Data");

      }).error(function(e){
        console.error(e);
      });
  }
















  })
  .controller('LeftCtrl', function($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function() {
      $mdSidenav('left').close()
        .then(function() {
          $log.debug("close LEFT is done");
        });
    };
  });
