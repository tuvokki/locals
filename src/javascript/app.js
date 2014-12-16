/**
 * This is the okkistan app
 */
var app = angular.module('okkiStan', ['ngRoute', 'ngResource', 'checklist-model']);

app.config(function($routeProvider) {
    $routeProvider.
      when('/zwadonk', {
        templateUrl: 'partials/zwadonk.html',
        controller: 'MainController'
      }).
      when('/fnurkels', {
        templateUrl: 'partials/fnurkels.html',
        controller: 'FnurkelsController'
      }).
      otherwise({
        redirectTo: '/zwadonk'
      });
  });
