'use strict';

/**
 * @ngdoc service
 * @name App.AdminPolicy
 * @description
 * # AdminPolicy
 * Factory in the App.
 */
angular.module('App')
  .factory('AdminPolicy', function ($http,$q) {
    return function () {
      var deferred = $q.defer();
      $http.get('/users/api/getuser')
        .success(function(data){
          console.log(data);
          if (data.role){ //any role, allow inbox
            deferred.resolve();
          }
        }).error(function(err){
          console.log(err);
          deferred.reject(true);
      });
      return deferred.promise ;
    }
  });
