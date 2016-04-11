'use strict';

/**
 * @ngdoc function
 * @name App.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the App
 */
angular.module('App')
  .controller('IndexCtrl', function ($scope, $location, $rootScope) {

    $scope.Logout = function(){
      console.log('User logging off');
      $location.path('/logout');
    };

    var AccessControl  =  {
      user : false,
      registerUser : function(u){ this.user = u }
    };

    $rootScope.AccessControl = AccessControl ;

  });
