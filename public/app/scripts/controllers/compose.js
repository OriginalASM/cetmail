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


var alert;
$scope.showAlert = showAlert;
$scope.showDialog = showDialog;
$scope.items = [1, 2, 3];

function showAlert() {
  alert = $mdDialog.alert({
    title: 'Attention',
    textContent: 'This is an example of how easy dialogs can be!',
    ok: 'Close'
  });
  $mdDialog
    .show(alert)
    .finally(function() {
      alert = undefined;
    });
}


function showDialog($event) {


  $scope.disableCompose = true;
  var parentEl = angular.element(document.body);
  $mdDialog.show({
    parent: parentEl,
    targetEvent: $event,
    templateUrl: 'views/compose.html',
    locals: {
      items: $scope.items
    },
    controller: DialogController
  });






  function DialogController($scope, $mdDialog, items) {
    $scope.items = items;
    $scope.closeDialog = function() {
      $scope.disableCompose = false;
      $mdDialog.hide();
      active();
    }
  }
}

function active() {
  $scope.disableCompose = false;

}




  });
