'use strict';

/**
 * @ngdoc function
 * @name App.controller:ComposeCtrl
 * @description
 * # ComposeCtrl
 * Controller of the App
 */
angular.module('App')
  .controller('ComposeCtrl', function ($scope, $http,$rootScope,$mdDialog, MailboxPassword) {
    $scope.mail = {
      password : MailboxPassword()
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
    };

    $scope.showAlert = showAlert;

    function showAlert(reason) {
      var alert = $mdDialog.alert({
        title: 'Attention',
        textContent: reason,
        ok: 'Close'
      });

      $mdDialog
        .show(alert)
        .finally(function() {
          alert = undefined;
        });
    }

    /*****************COMPOSE CONTROLS**********************/

    var DialogProps = {
      visible : false
    };

    $scope.DialogProps = DialogProps;
    $scope.showDialog = showComposeDialog;

    function showComposeDialog() {
      DialogProps.visible = true;
      $mdDialog.show({
        templateUrl: 'views/compose.html',
        controller: ComposeDialogCtrl
      });

      function ComposeDialogCtrl($scope, $mdDialog) {
        $scope.closeDialog = function() {
          $mdDialog.hide();
          DialogProps.visible = false;
        }
      }
    }

    /****************END COMPOSE CONTROLS**********************/

    /* text editor controls*/
    $scope.froalaOptions = {
      toolbarBottom: true,
      toolbarButtons: ['fullscreen', 'bold', 'italic','|',
        'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', '|',
        'color', 'emoticons','|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent']
      /*
      * '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'quote', 'insertHR', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html']
      * */
    }


  });
