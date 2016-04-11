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
    'ui.router', 'ngMaterial', 'ngAnimate', 'ngAria','md.data.table','ngMdIcons','froala'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .state('dashboard', {
        url : '/dashboard',
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
      .state('login', {
        url : '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .state('inbox', {
        url: '/inbox',
        resolve : {
          'check': function($location,UserPolicy,$rootScope) {
            $rootScope.LastURL = '/inbox';
            UserPolicy().then(
              function(){},
              function(err){
                $location.path('/login');
              });
          }
        },
        templateUrl: 'views/inbox.html',
        controller: 'InboxCtrl',
        controllerAs: 'inbox'
      })
      .state('FourOhThree', {
        url : '/FourOhThree',
        templateUrl: 'views/fourohthree.html',
        controller: 'FourohthreeCtrl',
        controllerAs: 'FourOhThree'
      })
      .state('logout', {
        url : '/logout',
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl',
        controllerAs: 'logout'
      })
      .state('compose', {
        url : '/compose',
        resolve : {
          'check': function($location,UserPolicy,$rootScope) {
            $rootScope.LastURL = '/compose';
            UserPolicy().then(
              function(){},
              function(err){
                $location.path('/login');
              });
          }
        },
        templateUrl: 'views/compose.html',
        controller: 'ComposeCtrl',
        controllerAs: 'compose'
      })
  })
  .value('froalaConfig', {
    toolbarInline: false,
    placeholderText: 'Body'
  });
