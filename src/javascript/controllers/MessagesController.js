app.controller('MessagesController', ['$scope', '$firebase', '$location', function($scope, $firebase, $location){

  $scope.whatsMyName = 'Messages';
  var fireBaseMessagesUrl = "https://amber-fire-3343.firebaseio.com/messages";

  // create a query for the most recent 50 messages on the server
  var ref = new Firebase(fireBaseMessagesUrl);//.orderBy("timestamp").limitToLast(50);
  // create an AngularFire reference to the data
  var sync = $firebase(ref);
  // download the data into a (psuedo read-only), sorted array
  // all server changes are applied in realtime
  var messagesArray = sync.$asArray();
  // place the list into $scope for use in the DOM
  $scope.messages = messagesArray;

  function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
  }
  $scope.uname = getURLParameter('uname');

  $scope.addMessage = function () {
    messagesArray.$add({ user: $scope.uname, text: $scope.messageText });
    $scope.messageText = '';
  };


}]);
