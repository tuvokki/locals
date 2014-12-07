/**
 * MainController. Responsible for the initial view.
 */
app.controller('MainController', function($scope, GithubSvc){
  $scope.whatsMyName = 'Zwadonk';
  $scope.whosTheMan = chance.string();
  $scope.things = [];
  GithubSvc.fetchStories().success(function (users) {
    $scope.users = users;
    console.log("users", users);
  });

  for (var i = 0; i < 100; i++) {
    $scope.things.push({code: i});
  }

  $scope.toggleRightpanel = function(event){
    $scope.showInfo = !$scope.showInfo;
    if(event){
      event.stopPropagation();
      event.preventDefault();
    }
  };
});

app.factory('GithubSvc', function ($http) {
  return {
    fetchStories: function () {
      return $http.get('https://api.github.com/users');
    }
  };
});