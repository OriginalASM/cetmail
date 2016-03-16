'use strict';

/**
 * @ngdoc directive
 * @name App.directive:pwCheck
 * @description
 * # pwCheck
 */
angular.module('App')
  .directive('pwCheck', function () {
    return {
      require: 'ngModel',
      link: function (scope, elm, attrs, ctrl) {
        ctrl.$parsers.unshift(function (viewValue) {
          var noMatch = viewValue != scope.myForm.password.$viewValue;
          ctrl.$setValidity('noMatch', !noMatch)
        })
      }
    }
  });
