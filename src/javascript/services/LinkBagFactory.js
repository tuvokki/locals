app.factory('LinkBagData', function($resource) {
  return $resource('http://localhost:3001/linkbag/:id');
});
