app.factory('LinkBagData', function($http, $q) {
    //return a reference to the the LinkBagData function
  return{
    getLinks: function() {
      var linkList = $http.post('http://localhost:3001/linkbag');
      // When our $http promise resolves
      return linkList.then(function(response) {
          if (typeof response.data === 'object') {
            return linkList;
          } else {
            // invalid response
            return $q.reject(response.data);
          }
        }, function(response) {
          // something went wrong
          return $q.reject(response.data);
      });
    }
  };
});
