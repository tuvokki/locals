# This is the okkistan app
app = angular.module 'okkiStan',
  ['ngRoute', 'ngResource']

app.config [
  '$compileProvider',
  ($compileProvider) ->
    # explicitly add URL protocols to Angular's whitelist
    $compileProvider.aHrefSanitizationWhitelist /^\s*(https?|javascript):/
    return
  ]
app.config [
  '$routeProvider',
  ($routeProvider) ->
    $routeProvider
      .when '/',
        name: 'index',
        templateUrl: 'partials/index.html'
        controller: 'IndexController'
      .otherwise
        name: '404',
        templateUrl: 'partials/notthere.html'
        controller: 'NotThereController'
      return
  ]

capitaliseFirstLetter = (string) ->
  string.charAt(0).toUpperCase() + string.slice(1)
