###
ScrithubController. Responsible for the view of the Scrum for GitHub issues.
###
app.controller "ScrithubController", ($scope, GitHubUtils) ->
  $scope.whatsMyName = "Scrum for GitHub issues"
  # $scope.issues = GitHubUtils.getIssues('locals')
  $scope.repo = 'tuvokki/ipsaver'

  issueList = GitHubUtils.getIssues($scope.repo)
  issueList.then (list) ->
    console.log list
    $scope.issues = list
    return

  $scope.updateList = ->
    issueList = GitHubUtils.getIssues($scope.repo)
    issueList.then (list) ->
      console.log list
      $scope.issues = list
      return

  # $scope.$watch 'repo', (newRepop, oldRepo) ->
  #   if $scope.repo.length > 0
  #     ff = GitHubUtils.getIssues($scope.repo)
  #     ff.then (list) ->
  #       console.log list
  #       $scope.issues = list
  #       return

  return

