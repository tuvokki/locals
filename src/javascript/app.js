/**
 * This is the okkistan app
 */
var app = angular.module('okkiStan', ['ngRoute', 'ngResource', 'checklist-model']);

app.config(
  function($routeProvider) {
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
  })
  .config([
    '$compileProvider',
    function( $compileProvider )
    {   
      // explicitly add URL protocols to Angular's whitelist
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|javascript):/);
    }
]
);
