###*
ModulesController. Responsible for the index view.
###
app.controller "ModulesController", ($scope, $location, moduleName) ->
  # console.log $location.path().replace '/module/', ''
  $scope.whatsMyName = "Welcome to " + moduleName
  console.log 'Got ' + moduleName
  return
