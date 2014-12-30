###*
NotThereController. Responsible for the 404 view.
###
app.controller "NotThereController", ($scope, $location) ->
  $scope.whatsMyName = "Error not found"
  $scope.message = "Sorry, the page you are looking
    for is not here." + $location.path()
  $scope.errorcode = 404
  return
