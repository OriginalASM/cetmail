'use strict';

/**
 * @ngdoc function
 * @name App.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the App
 */
angular.module('App')
  .controller('LoginCtrl', function ($scope,$http,$log,$location,$rootScope,$mdDialog) {
    $scope.Status = 'Alive' ;
    $scope.Credentials={};
    function showAlert(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#logindiv')))
          .clickOutsideToClose(true)
          .title('Failed')
          .textContent('Failed to login. Invalid Username or Password')
          .ok('Got it!')
          .targetEvent(ev)
      );
    };
    $scope.Login = function($event){
      var Credentials = angular.copy($scope.Credentials);
      Credentials.username = $scope.Credentials.username.split(/@[\w]+[.][\w]+/).join('');
      $http({
        method: 'POST',
        url: '/users/api/login/',
        data: Credentials
      }).success(function(data){
        var x = $rootScope.LastURL || '/inbox';
        //console.log(x);

        if(data.error){
          showAlert($event);
        }else{
          $location.path(x);
        }
        //$location.path('/inbox');

      }).error(function(err){
        //console.log('Cant login');

      });
    };

  });
