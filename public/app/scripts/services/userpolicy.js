'use strict';

/**
 * @ngdoc service
 * @name App.UserPolicy
 * @description
 * # UserPolicy
 * Factory in the App.
 */
angular.module('App')
  .factory('UserPolicy', function ($q,$http) {
    return function (level) {
      var deferred = $q.defer();
      $http.get('/users/api/getuser')
        .success(function(data){
          console.log('User logged in');
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
