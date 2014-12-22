app.factory('LinkBagData', function($resource) {
  return $resource('http://whatever.tuvok.nl/linkback/:id');
});
