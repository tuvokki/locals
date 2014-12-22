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

  var uname = window.location.href.replace(window.location.hash, '').split('?')[1].split("&")[2].split('=')[1];
  // console.log('Username: [%s]', uname);

  // // add a new record to the list
  // messagesArray.$add({ user: "physicsmarie", text: "Hello world" });
  // // remove an item from the list
  // messagesArray.$remove(aRecordKey);
  // // change a message and save it
  // var item = messagesArray.$getRecord(aRecordKey);
  // item.user = "alanisawesome";
  // messagesArray.$save(item).then(function() {
  //   // data has been saved to Firebase
  // });
  

  $scope.addMessage = function (newMessageText) {
    console.log('newMessageText', newMessageText);

    messagesArray.$add({ user: uname, text: newMessageText });
  };


}]);
