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
    var deferred = $q.defer();
    $http.get('/users/api/getuser')
      .success(function(data){
        if (data.role == 'admin'){
          deferred.resolve();
        }else {
          deferred.reject('You are not ADMIN');
        }
      }).error(function(err){
        deferred.reject(err);
    });

    return deferred.promise ;
  });
