app.factory 'LinkBagData', ($resource) ->
  #$resource 'http://localhost:3019/linkbag/:id'
  $resource 'http://whatever.tuvok.nl/linkback/:id'

app.factory 'LinkBagUtils', ->
  tags = []

  getTags: (linkbaglist) ->
    angular.forEach linkbaglist, (linkbag) ->
      # combine the tags using Array#reduce
      # See: http://davidwalsh.name/combining-js-arrays
      tags = linkbag.tags.reduce (coll,item) ->
        coll.push item
        return coll
      , tags

    # Remove the duplicates
    # Although concise, this algorithm is not particularly
    # efficient for large arrays (quadratic time).
    # See: http://stackoverflow.com/a/9229821/2245236
    tags = tags.filter (item, pos, self) ->
      self.indexOf(item) == pos

    return tags
