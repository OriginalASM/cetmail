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
                                    $log, $http, $rootScope, $mdDialog, MailboxPassword, $location, $q) {
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.goToPath = function(p,s){
      s = s.toString().toLowerCase();
      $location.path(p+s);
    };
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
     //Declaring class for mails
     $scope.currentDate = new Date();
     $scope.inboxVisible=false;
     $scope.showLoader=true;
     $scope.msgs = [];
     $scope.navs = [];
     $scope.pagination = {
       begin : 0,
       size : $scope.msgs.length,
       pageLimit : 20,
       previous : function(){
         console.log('begin is '+this.begin+' pagelimit is '+this.pageLimit);
         if(this.begin-this.pageLimit >=0){
           this.begin -= this.pageLimit;
           console.log('begin is now '+this.begin);
         }else{
           this.begin = 0;
         }
       },
       next : function(){
         console.log('begin is '+this.begin+' pagelimit is '+this.pageLimit);
         if(this.begin+this.pageLimit <=this.size){
           this.begin +=this.pageLimit;
           console.log('begin is now '+this.begin);
         }
       }
     };
     function Mail(Index){
       this.index = Index;
       this.from_mail = {};
       this.reply_to = {};
       //functions yet to be implemented.
       this.reply = function(){
         console.log('Reply');
       };
       this.forward = function(){
         console.log('Forward');
       };
       //
       this.fetch_body = function(a) {
         this.visible = true;
         $scope.showLoader=true;
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
           //this.subject=s[0].body.headers.subject;
           //console.log('Subject : ' + $scope.expandedMail.subje);
           //console.log(s);
           //this.date=s[0].body.date;
           //console.log('Date : ' + $scope.expandedMail.date);
           a.from_mail.address= s[0].body.from[0].address;
           //console.log('From mail: ' + $scope.expandedMail.from_mail.address);
           a.from_mail.name= s[0].body.from[0].name;
           //console.log('From Name: ' + $scope.expandedMail.from_mail.name);
           //this.to= s[0].body.to;
           //console.log('To mail: ' + $scope.expandedMail.to[0].address + ' ' + $scope.expandedMail.to[0].name);
           a.ms= $sce.trustAsHtml(s[0].body.html);
           //console.log('Body: ' + $scope.expandedMail.ms);
           a.reply_to.address= s[0].envelope['reply-to'][0].address;
           //console.log('Reply to address: ' + $scope.expandedMail.reply_to.address);
           a.reply_to.name= s[0].envelope['reply-to'][0].name;
           //console.log('Reply to name: ' + $scope.expandedMail.reply_to.name);
           //alert("Recieving Data");
           $rootScope.currentMail = angular.copy(a);
           $scope.showLoader = false;
           $scope.inboxVisible = false;
           console.log($scope.currentMail);
         }).error(function(e) {
           console.error(e);
         });
       }
     }
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


    $scope.loadMails = function(f) {
      $scope.showLoader = true;
      $scope.msgs = []; // empty old list
      var Data = {
        password: MailboxPassword(),
        startIndex: '1',
        endIndex: '*'
      };
      //console.log(Data);
      $scope.promise = $http({
        method: 'POST',
        url: '/mail/fetch/headers',
        data: Data
      }).success(function (Messages) {

        number_of_mails(Messages.length);

        try {
          Messages.forEach(function (msg) {

            var mail = new Mail(parseInt(msg.index));
            mail.from_mail.address = msg.envelope.sender[0].address;
            mail.from_mail.name = msg.envelope.sender[0].name;
            mail.subject = msg.envelope.subject;
            mail.date = new Date(msg.envelope.date);
            mail.to = msg.envelope.to[0].address;
            mail.index = msg.index;
            if(msg.flags.indexOf("\\Seen") >=0){
              mail.seen=true;
            }else{
              mail.seen=false;
            }
            $scope.msgs.push(mail);
          });
          $scope.pagination.size=$scope.msgs.length;
        } catch (e) {
          console.log(e);
        } finally {
          $scope.showLoader = false;
          $scope.inboxVisible = true;
          if(typeof f == 'function' ){
            f();
          }
        }

      }).error(function (err) {
        console.log(err);
      });
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
