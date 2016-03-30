'use strict';

/**
 * @ngdoc function
 * @name App.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the App
 */
angular.module('App')
  .controller('RegisterCtrl', function ($scope,$location,$http,$rootScope,$mdDialog) {
    $scope.Credentials = {};
    $scope.data = {
      gender : 'Male'
    };
    $scope.usernameStatus = '';
    $scope.available = true;
    $scope.Register = function($event){
      var Credentials = angular.copy($scope.Credentials);
      Credentials.gender = $scope.data.gender.charAt(0).toLowerCase() + $scope.data.gender.slice(1);;
      console.log(Credentials);
      $http({
        method : 'POST',
        url : '/users/api/insert',
        data : Credentials
      }).success(function(data){
        if(data.error){
          console.log('The data cannot be inserted.');
        }else{
          console.log('Registration Successful !');

            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#logindiv')))
                .clickOutsideToClose(true)
                .title('Registration Succesful.')
                .textContent('Your account Registration is Successful. Please login to continue.')
                .ok('Got it!')
            );

            $location.path('/inbox');
        };
      }).error(function(err){
        console.log('There has been the following error : '+err);
      });
    };
    $scope.isavailable = function(){
      if(!$scope.Credentials.username){
        $scope.usernameStatus = '';
      }else{
        var Data = { username : $scope.Credentials.username.trim() };
        //console.log(Data);
        $http({
          method : 'POST' ,
          url : '/users/api/checkusername' ,
          data : Data
        }).success(function(s){
          if(s.status){
            //console.log('Username available');
            $scope.available = true;
          }else{
            //console.log('Username not available');
            $scope.available = false;
          }
        }).error(function(err){
          console.log(err);
        });
      }
    };
    /*$scope.$watch('Credentials.username',function(){
      console.log($scope.Credentials.username);
    });*/
  });
