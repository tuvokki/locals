/**
 * MainController. Responsible for the initial view.
 */
app.controller('MainController', ['$scope', 'GithubSvc', '$firebase', function($scope, GithubSvc, $firebase){
  $scope.whatsMyName = 'Zwadonk';
  $scope.whosTheMan = chance.string();
  $scope.things = [];
  GithubSvc.fetchStories().success(function (org_repos) {
    $scope.org_repos = org_repos;
    console.log("org_repos", org_repos);
  });

  var ref = new Firebase("https://amber-fire-3343.firebaseio.com/");
  // create an AngularFire reference to the data
  var sync = $firebase(ref);
  // download the data into a local object
  $scope.data = sync.$asObject();

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
}]);

app.factory('GithubSvc', function ($http) {
  return {
    fetchStories: function () {
      return $http.get('https://api.github.com/orgs/TuvokVersatileKolinahr/repos');
    }
  };
});