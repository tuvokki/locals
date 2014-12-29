###*
ImpressController. Responsible for the controlling the fnurk.
###
app.controller "ImpressController", ($scope, $document) ->
  $scope.whatsMyName = "Impress me"
  $document.ready ->
    impress().init()
  return

