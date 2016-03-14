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
    return function (level) {
      console.log(level);
      var deferred = $q.defer();
      $http.get('/users/api/getuser')
        .success(function(data){
          if (data.role == level){
            console.log('User is an admin');
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
