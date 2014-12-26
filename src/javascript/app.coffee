# This is the okkistan app
app = angular.module 'okkiStan',
  ['ngRoute', 'ngResource', 'checklist-model', 'firebase']

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
      .when '/zwadonk',
        templateUrl: 'partials/zwadonk.html',
        controller: 'MainController'
      .when '/fnurkels',
        templateUrl: 'partials/fnurkels.html',
        controller: 'FnurkelsController'
      .when '/messages',
        templateUrl: 'partials/messages.html',
        controller: 'MessagesController'
      .when '/impress',
        templateUrl: 'partials/impress.html',
        controller: 'ImpressController'
      .otherwise
        redirectTo: '/messages'
      return
  ]
