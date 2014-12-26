app.factory 'UserData', ->
  factoryData = {}
  factoryData.users =
    [{
      'username': 'gchap',
      'password': 'Albert',
      'name': 'Graham Chapman',
      'birth': '1941',
      'died': '1989'
    },{
      'username': 'jclee',
      'password': 'odontolcate',
      'name': 'John Cleese',
      'birth': '1939'
    },{
      'username': 'tgill',
      'password': 'wheresoeer',
      'name': 'Terry Gilliam',
      'birth': '1940'
    },{
      'username': 'eidle',
      'password': 'prologus',
      'name': 'Eric Idle',
      'birth': '1943'
    },{
      'username': 'tjone',
      'password': 'naphthanthracene',
      'name': 'Terry Jones',
      'birth': '1942'
    },{
      'username': 'mpali',
      'password': 'benempted',
      'name': 'Michael Palin',
      'birth': '1943'
    }]

  return factoryData