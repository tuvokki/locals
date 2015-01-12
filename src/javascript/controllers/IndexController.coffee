###*
IndexController. Responsible for the index view.
###
app.controller "IndexController", ($scope, $route) ->
  $scope.whatsMyName = "Welcome my son"
  $scope.routename = $route.current.name
  return
