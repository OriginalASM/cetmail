'use strict';

/**
 * @ngdoc function
 * @name App.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the App
 */
angular.module('App')
  .controller('LoginCtrl', function ($scope,$http,$log) {
    $scope.Status = 'Alive' ;
    $scope.Credentials={};
    $scope.Login = function(){
      console.log($scope.Credentials.username);
      $http({
        method: 'POST',
        url: '/users/api/login/',
        data: $scope.Credentials
      }).success(function(data){
        $log.debug(data);
      }).error(function(err){
        $log.warn("Post request failed!");
      });
    };
  });
