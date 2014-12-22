/**
 * This is the okkistan app
 */
var app = angular.module('okkiStan', ['ngRoute', 'ngResource', 'checklist-model', 'firebase']);

app.config(
  function($locationProvider, $routeProvider) {
    $routeProvider.
      when('/zwadonk', {
        templateUrl: 'partials/zwadonk.html',
        controller: 'MainController'
      }).
      when('/fnurkels', {
        templateUrl: 'partials/fnurkels.html',
        controller: 'FnurkelsController'
      }).
      when('/messages', {
        templateUrl: 'partials/messages.html',
        controller: 'MessagesController'
      }).
      otherwise({
        redirectTo: '/messages'
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
