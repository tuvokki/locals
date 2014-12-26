# Load all required libraries.
gulp        = require 'gulp'
browserSync = require 'browser-sync'
livereload  = require 'gulp-livereload'
del         = require 'del'
replace     = require 'gulp-replace'

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
  serverPort = 8989
  http = require 'http'
  finalhandler = require 'finalhandler'
  serveStatic = require 'serve-static'
  serve = serveStatic "./dist/"

  server = http.createServer (req, res) ->
    done = finalhandler req, res
    serve req, res, done

  server.listen serverPort
  console.log 'starting server on port ' + serverPort
  open = require 'open'
  open 'http://localhost:' + serverPort + '/'

# Task to start a server and use live reload
# Depends on: webserver, live-reload
gulp.task 'serve', ['webserver', 'live-reload']