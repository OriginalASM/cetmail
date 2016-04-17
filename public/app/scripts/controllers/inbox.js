'use strict';

/**
 * @ngdoc function
 * @name App.controller:InboxCtrl
 * @description
 * # InboxCtrl
 * Controller of the App
 */
angular.module('App')
  .controller('InboxCtrl', function($scope, $sce, $timeout, $mdSidenav,
                                    $log, $http, $rootScope, $mdDialog,
                                   $location, $q , inbox) {


    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.goToPath = function(p,s,x){
      s = s.toString().toLowerCase();
      if(x){
      $location.path(p+s+x);}
      else {
        $location.path(p+s);
      }
    };
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
     //Declaring class for mails
     $scope.currentDate = new Date();
     $scope.inboxVisible=false;
     $scope.showLoader=true;
     $scope.navs = [];

     //end
    $scope.menu = [];

    $scope.selectedMails = [];
    $scope.markAsRead = function(){
      var size = $scope.select.selected.length;
      var q = $q.defer();
      for(var i=0;i< size;i++){
        if(i==size-1)
          q.resolve(true);
        $scope.select.selected[i].fetch_body($scope.select.selected[i]);
      };
      q.promise.then(function(){
        $scope.loadMails();
      });
    }

    $scope.try = function(){
      console.log('trying');
      for(mail in $scope.selectedMails){
        console.log(mail.subject);
      }
    };

   $scope.select = {
      selected : [],
      update : function(mail){
        if(this.selected.indexOf(mail) >=0){
          this.selected.splice(this.selected.indexOf(mail),1);
          //console.log('Already in array.');
        }else{
          this.selected.push(mail);
          //console.log('Not in array.');
        }
        //console.log(this.selected);
      }
    };


    $scope.query = {
      order: 'index',
      limit: 10,
      page: 1
    };


    $rootScope.loadInboxMails = $scope.loadMails ;

    $scope.promise = $http.get('/users/api/getuser')
      .success(function(data) {
        $scope.user = data;
        //console.log('User logged in');
      }).error(function(err) {
        console.log(err);

      });


    $scope.menu = $rootScope.mailboxes ;


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

    /*********Reply button**********/
    $scope.visib=false;







  })
  .controller('LeftCtrl', function($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function() {
      $mdSidenav('left').close()
        .then(function() {
          $log.debug("close LEFT is done");
        });
    };
  });
