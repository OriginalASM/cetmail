'use strict';

/**
 * @ngdoc function
 * @name App.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the App
 */
angular.module('App')
  .controller('IndexCtrl', function ($scope,$location) {

    $scope.Logout = function(){
      console.log('User logging off');
      $location.path('/logout');
    }
  });
