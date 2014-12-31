###*
ModulesController. Responsible for the index view.
###
app.controller "ModulesController", ($scope, $location, $routeParams) ->
  console.log $location.path().replace '/module/', ''
  $scope.whatsMyName = "Welcome to " + $routeParams.moduleName
  return
