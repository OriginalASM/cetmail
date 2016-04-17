'use strict';

/**
 * @ngdoc directive
 * @name App.directive:pagination
 * @description
 * # pagination
 */
angular.module('App')
  .directive('pagination', function() {
      return {
        templateUrl: 'views/pagination.html',
        restrict: 'AE',
        scope : {
          pageLimit:'=',
          begin: '='
        },
        controller: function($scope,$rootScope) {
          if(typeof $rootScope.msgs !== 'array')
            $rootScope.msgs= [];
          $scope.pagination = {
            begin: 0,
            size: $rootScope.msgs.length,
            pageLimit: 20,
            previous: function() {
              console.log('begin is ' + this.begin + ' pagelimit is ' + this.pageLimit);
              if (this.begin - this.pageLimit >= 0) {
                this.begin -= this.pageLimit;
                console.log('begin is now ' + this.begin);
              } else {
                this.begin = 0;
              }
            },
            next: function() {
              console.log('begin is ' + this.begin + ' pagelimit is ' + this.pageLimit);
              if (this.begin + this.pageLimit <= this.size) {
                this.begin += this.pageLimit;
                console.log('begin is now ' + this.begin);
              }
            }
          };
        },
        link: function(scope,element,attrs) {
          scope.pagination.begin = attrs.begin;
          scope.pagination.pageLimit = attrs.pageLimit;
        }
      }
    });
