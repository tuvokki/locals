var http = require('http');

var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');

var serve = serveStatic("./dist/");

var server = http.createServer(function(req, res){
  var done = finalhandler(req, res)
  serve(req, res, done)
});

server.listen(8989);
console.log("starting server on port 8989");
var open = require('open');
open('http://localhost:8989/');
