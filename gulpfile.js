var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    livereload  = require('gulp-livereload'),
    replace     = require('gulp-replace');

// Note the new way of requesting CoffeeScript since 1.7.x
require('coffee-script/register');
// This bootstraps your Gulp's main file
require('./gulpfile.coffee');

gulp.task('browser-sync', function() {
  browserSync.init(["dist/static/css/*.css", "dist/static/js/*.js", "dist/index.html", "dist/partials/*.html"], {
    server: {
      baseDir: "./dist/"
    }
  });
});

/**
 * Start the live reload server. Live reload will be triggered when a file in the `dist` folder or the index.html changes. This will add a live-reload script to the page, which makes it all happen.
 * Depends on: watch
 */
gulp.task('live-reload', ['watch'], function() {

  // first, delete the index.html from the dist folder as we will copy it later
  del(['dist/index.html']);

  // add livereload script to the index.html
  gulp.src(['src/index.html'])
   .pipe(replace(/(\<\/body\>)/g, "<script>document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1\"></' + 'script>')</script>$1"))
   .pipe(gulp.dest('dist'));
   
  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/* & index.html, reload on change
  gulp.watch(['dist/**', 'index.html']).on('change', livereload.changed);
});

/**
 * Task to start a Express server on port 4000.
 */
gulp.task('webserver', function(){
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
});

gulp.task('build', ['clean'], function() {
    gulp.start('css', 'scripts', 'html', 'resources');
});

/**
 * Task to start a Express server on port 4000 and used the live reload functionality.
 * Depends on: webserver, live-reload
 */
gulp.task('serve', ['webserver', 'live-reload'], function(){});

