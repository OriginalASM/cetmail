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
          console.log(data);
          if (data.role == level){
            deferred.resolve();
          }else {
            deferred.reject(false);
          }
        }).error(function(err){
          console.log(err);
          deferred.reject(true);
      });
      return deferred.promise ;
    }
  });
