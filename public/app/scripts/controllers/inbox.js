'use strict';

/**
 * @ngdoc function
 * @name App.controller:InboxCtrl
 * @description
 * # InboxCtrl
 * Controller of the App
 */
angular.module('App')
  .controller('InboxCtrl', function($scope, $timeout, $mdSidenav, $log,$mdDialog) {
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

    $scope.activity = [{
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
    }, ];



    $scope.selected = [];

    $scope.query = {
      order: 'name',
      limit: 5,
      page: 1
    };


    $scope.desserts = [{
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

    $scope.count = $scope.desserts.length;

    $scope.onPaginate = function(page, limit) {
      console.log('Scope Page: ' + $scope.query.page + ' Scope Limit: ' + $scope.query.limit);
      console.log('Page: ' + page + ' Limit: ' + limit);

      $scope.promise = $timeout(function() {

      }, 2000);
    };

    $scope.deselect = function(item) {
      console.log(item.name, 'was deselected');
    };

    $scope.log = function(item) {
      console.log(item.name, 'was selected');
    };

    $scope.loadStuff = function() {
      $scope.promise = $timeout(function() {

      }, 2000);
    };

    $scope.onReorder = function(order) {

      console.log('Scope Order: ' + $scope.query.order);
      console.log('Order: ' + order);

      $scope.promise = $timeout(function() {

      }, 2000);
    };


      var alert;
      $scope.showAlert = showAlert;
      $scope.showDialog = showDialog;
      $scope.items = [1, 2, 3];
      function showAlert() {
        alert = $mdDialog.alert({
          title: 'Attention',
          textContent: 'This is an example of how easy dialogs can be!',
          ok: 'Close'
        });
        $mdDialog
          .show(alert)
          .finally(function() {
            alert = undefined;
          });
      }


      function showDialog($event) {


        $scope.disableCompose=true;
        var parentEl = angular.element(document.body);
        $mdDialog.show({
          parent: parentEl,
          targetEvent: $event,
          templateUrl:'views/compose.html',
          locals: {
            items: $scope.items
          },
          controller: DialogController
        });

        function DialogController($scope,$mdDialog, items) {
          $scope.items = items;
          $scope.closeDialog = function() {
            $scope.disableCompose=false;
            $mdDialog.hide();
            active();
          }
        }
      }


function active(){
  $scope.disableCompose=false;

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
  })
  .controller('LeftCtrl', function($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function() {
      $mdSidenav('left').close()
        .then(function() {
          $log.debug("close LEFT is done");
        });
    };
  });
