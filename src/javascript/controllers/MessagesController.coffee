app.controller "MessagesController", [
  "$scope"
  "$firebase"
  "$location"
  ($scope, $firebase, $location) ->
    $scope.whatsMyName = "Messages"
    fireBaseMessagesUrl = "https://amber-fire-3343.firebaseio.com/messages"
    
    # create a query for the most recent 50 messages on the server
    ref = new Firebase(fireBaseMessagesUrl) #.orderBy("timestamp").limitToLast(50);
    # create an AngularFire reference to the data
    sync = $firebase(ref)
    
    # download the data into a (psuedo read-only), sorted array
    # all server changes are applied in realtime
    messagesArray = sync.$asArray()
    
    # place the list into $scope for use in the DOM
    $scope.messages = messagesArray

    getURLParameter = (name) ->
      decodeURIComponent name[1]  if name = (new RegExp("[?&]" + encodeURIComponent(name) + "=([^&]*)")).exec(location.search)
    $scope.uname = getURLParameter("uname")

    # add a message
    $scope.addMessage = ->
      messagesArray.$add
        user: $scope.uname
        text: $scope.messageText

      $scope.messageText = ""
      return
]
