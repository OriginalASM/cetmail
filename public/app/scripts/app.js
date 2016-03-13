'use strict';

/**
 * @ngdoc overview
 * @name App
 * @description
 * # App
 *
 * Main module of the application.
 */
angular
  .module('App', [
    'ngRoute', 'ngMaterial', 'ngAnimate', 'ngAria'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/dashboard', {
        resolve : {
          'check': function($location,AdminPolicy,$rootScope) {
            $rootScope.LastURL = '/dashboard';
            AdminPolicy('admin').then(
              function(){},
              function(fail){
                console.log(fail);
                if(fail)
                  $location.path('/login');
                else {
                  $location.path('/FourOhThree');
                }
              });
          }
        },
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .when('/inbox', {
        resolve : {
          'check': function($location,UserPolicy,$rootScope) {
            $rootScope.LastURL = '/inbox';
            UserPolicy().then(
              function(){},
              function(err){
                console.log(err);
                $location.path('/login');
              });
          }
        },
        templateUrl: 'views/inbox.html',
        controller: 'InboxCtrl',
        controllerAs: 'inbox'
      })
      .when('/FourOhThree', {
        templateUrl: 'views/fourohthree.html',
        controller: 'FourohthreeCtrl',
        controllerAs: 'FourOhThree'
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl',
        controllerAs: 'logout'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
