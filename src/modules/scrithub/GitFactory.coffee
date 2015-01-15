app.factory 'GitHubUtils', ->
  getIssues: (repo) ->
    # see: http://philschatz.com/2014/05/25/octokat/
    #put your oauth token here, create one here: https://github.com/settings/applications#personal-access-tokens
    octo = new Octokat { token: "__OAUTH_TOKEN__" }
    # cb = (err, val) ->
    #   console.log val
    #   return val

    # octo.zen.read cb

    # octo.users('tuvokki').fetch cb

    # octo.repos('tuvokki', repo).issues.fetch cb

    # REPO = octo.repos('tuvokki/' + repo)
    # REPO.issues.fetch()
    # .then (issues) ->
    #   console.log(issues)
    #   return issues

    REPO = octo.repos(repo)
    REPO.issues.fetch()
