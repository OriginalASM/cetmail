'use strict';

/**
 * @ngdoc function
 * @name App.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the App
 */
angular.module('App')
  .controller('RegisterCtrl', function ($scope) {
    $scope.Credentials = {};
    $scope.data = {
      gender : 'Male'
    }
  });
