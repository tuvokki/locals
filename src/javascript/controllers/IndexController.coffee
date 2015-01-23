###*
IndexController. Responsible for the index view.
###
app.controller "IndexController", ($scope, $route) ->
  $scope.whatsMyName = "Testable content"
  $scope.routename = $route.current.name
  return
