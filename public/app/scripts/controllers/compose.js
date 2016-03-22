'use strict';

/**
 * @ngdoc function
 * @name App.controller:ComposeCtrl
 * @description
 * # ComposeCtrl
 * Controller of the App
 */
angular.module('App')
  .controller('ComposeCtrl', function ($scope, $http,$rootScope,$mdDialog) {
    $scope.mail = {
      password : $rootScope.pass
    };
    $scope.sendMail = function(){
      $http({
        method:'post',
        url: '/mail/new/simple/',
        headers: {'Content-Type': 'application/json'},
        data: $scope.mail
      }).success(function(s){
        console.log(s);
        alert(s);

      }).error(function(e){
        console.error(e);
      });


      




    }





  });
