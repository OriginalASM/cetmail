'use strict';

/**
 * @ngdoc directive
 * @name App.directive:FixedNavbar
 * @description
 * # FixedNavbar
 */
angular.module('App')
  .directive('fixedNavbar', function () {
    return {
      templateUrl: 'views/fixednavbar.html',
      restrict: 'AE',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
