app.factory('LinkBagData', function($resource) {
//   return $resource('http://localhost:3019/linkbag/:id');
  return $resource('http://whatever.tuvok.nl/linkback/:id');
});
app.factory('LinkBagUtils', function() {
  var tags = [];

  return {
    getTags: function (linkbaglist) {
      angular.forEach(linkbaglist, function(linkbag) {
        // combine the tags using Array#reduce
        // See: http://davidwalsh.name/combining-js-arrays
        tags = linkbag.tags.reduce( function(coll,item){
            coll.push( item );
            return coll;
        }, tags );
      });

      // Remove the duplicates
      // Although concise, this algorithm is not particularly efficient for large arrays (quadratic time).
      // See: http://stackoverflow.com/a/9229821/2245236
      tags = tags.filter(function(item, pos, self) {
        return self.indexOf(item) == pos;
      });

      return tags;
    },
  };

});