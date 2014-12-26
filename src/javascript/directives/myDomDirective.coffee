app.directive 'myDomDirective', ->
  link: ($scope, element, attrs) ->
    element.bind 'click', ->
      element.html 'You clicked me!'
      return
    element.bind 'mouseenter', ->
      element.css 'background-color', 'yellow'
      return
    element.bind 'mouseleave', ->
      element.css 'background-color', 'white'
      return
    return