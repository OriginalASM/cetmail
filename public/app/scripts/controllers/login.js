'use strict';

/**
 * @ngdoc function
 * @name App.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the App
 */
angular.module('App')
  .controller('LoginCtrl', function ($scope,$http,$log,$location,$rootScope) {
    $scope.Status = 'Alive' ;
    $scope.Credentials={};
    $scope.Login = function(){
      var Credentials = angular.copy($scope.Credentials);
      Credentials.username = $scope.Credentials.username.split(/@[\w]+[.][\w]+/).join('');
      $http({
        method: 'POST',
        url: '/users/api/login/',
        data: Credentials
      }).success(function(data){
        var x = $rootScope.LastURL || '/inbox';
        console.log(x);
        $location.path(x);
        //$location.path('/inbox');

      }).error(function(err){
        console.log('Post request failed !');
      });
    };
  });
