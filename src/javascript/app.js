/**
 * This is the okkistan app
 */
var app = angular.module('okkistan', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider.
      when('/zwadonk', {
        templateUrl: 'partials/zwadonk.html',
        controller: 'MainController'
      }).
      when('/fnurkels', {
        templateUrl: 'partials/fnurkels.html',
        controller: 'FnurkController'
      }).
      otherwise({
        redirectTo: '/zwadonk'
      });
  });
