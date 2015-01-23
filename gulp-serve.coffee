# Load all required libraries.
del         = require 'del'
gulp        = require 'gulp'
nconf       = require 'nconf'
browserSync = require 'browser-sync'
replace     = require 'gulp-replace'
livereload  = require 'gulp-livereload'

# Setup nconf to use (in-order):
#   1. Command-line arguments
#   2. Environment variables
#   3. A file located at 'path/to/config.json'
#
nconf.argv()
     .env()
     .file({ file: 'local_settings.json' });

# Set some options for debugging
debug_opts = {}
debug_opts.verbose = nconf.get('v')? || nconf.get('verbose')?

# Set up browser sync with an array of changable resources
gulp.task 'browser-sync', ->
  browserSync.init ["dist/static/css/*.css",
                    "dist/static/js/*.js",
                    "dist/index.html",
                    "dist/partials/*.html"],
                    server: {
                      baseDir: "./dist/"
                    }

# Start the live reload server. Live reload will be triggered when a file in the `dist` folder or the index.html changes. This will add a live-reload script to the page, which makes it all happen.
gulp.task 'live-reload', ['watch'], ->
  # first delete the index.html
  # from the dist folder as we will copy it later
  # del ['dist/index.html']

  gulp.src ['script/index.html']
    # .pipe replace /(\<\/body\>)/g, "<script>document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1\"></' + 'script>')</script>$1"
    .pipe gulp.dest 'dist'

  # create the livereload server
  livereload.listen()

  # watch files and reload on change
  gulp.watch ['dist/**', 'index.html']
    .on 'change', livereload.changed

# Task to start a serve-static server on port 8989
gulp.task 'webserver', ->
  serverName  = nconf.get('i') || nconf.get('ip')
  serverPort  = nconf.get('p') || nconf.get('port')
  serverDir   = nconf.get('d') || nconf.get('dir')
  openBrowser = nconf.get('o') || nconf.get('open')
  http = require 'http'
  finalhandler = require 'finalhandler'
  serveStatic = require 'serve-static'
  if debug_opts.verbose
    console.log 'starting server on http://' + serverName + ':' + serverPort + '/'

  serve = serveStatic serverDir

  server = http.createServer (req, res) ->
    done = finalhandler req, res
    serve req, res, done

  server.listen serverPort
  if openBrowser
    if debug_opts.verbose
      console.log 'Opening http://' + serverName + ':' + serverPort + '/ in browser ...'
    open = require 'open'
    open 'http://' + serverName + ':' + serverPort + '/'

# Task to start a server and use live reload
# Depends on: webserver, live-reload
gulp.task 'serve', ['webserver', 'live-reload']