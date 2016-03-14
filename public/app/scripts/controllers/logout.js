'use strict';

/**
 * @ngdoc function
 * @name App.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the App
 */
angular.module('App')
  .controller('LogoutCtrl', function ($scope,$http) {
    $scope.message='Please Wait';
    $http({
      method : 'POST',
      url : '/users/api/logout'
    }).success(function(data){
      if(data.message='success'){
        $scope.message='You have successfully logged out !';
      }else{
        $scope.message='There was some problem logging out !';
      }
    }).error(function(err){
      $scope.message='Cannot connect to the server !';
    });
  });
