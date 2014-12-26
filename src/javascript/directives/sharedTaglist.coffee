app.directive "sharedTaglist", ->
  template: '<label ng-repeat="tag in tags">
    <input type="checkbox" checklist-model="dump.tags"
    checklist-value="tag" id="id-{{tag}}" ng-change="filterLinksByTags()">
    <label for="id-{{tag}}">{{tag}}</label>
    </label>'
