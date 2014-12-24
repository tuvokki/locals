var underscore  = require('underscore'),
    fs          = require('fs'),
    gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    minifyHTML  = require('gulp-minify-html'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    jshint      = require('gulp-jshint'),
    stylish     = require('jshint-stylish'),
    browserSync = require('browser-sync'),
    del         = require('del'),
    plumber     = require('gulp-plumber'),
    livereload  = require('gulp-livereload'),
    replace     = require('gulp-replace');

gulp.task('sass', function () {
  gulp.src('src/scss/styles.scss')
    .pipe(plumber())
    .pipe(sass({includePaths: ['scss']}))
    .pipe(gulp.dest('dist/static/css'));
});

/**
 * gulp-minify-html
 * All options are false by default.
 * 
 * empty        - do not remove empty attributes
 * cdata        - do not strip CDATA from scripts
 * comments     - do not remove comments
 * conditionals - do not remove conditional internet explorer comments
 * spare        - do not remove redundant attributes
 * quotes       - do not remove arbitrary quotes
 * 
 * so setting empty:true is the same as telling minifyHTML "do not remove empty attributes."
 */
gulp.task('minify-html', function() {
  var opts = {empty:true,spare:true};

  gulp.src('src/*.html')
    .pipe(plumber())
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('dist'))
});

gulp.task('minify-partials', function() {
  var opts = {empty:true,spare:true};

  gulp.src('src/partials/*.html')
    .pipe(plumber())
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('dist/partials'))
});

/**
 * Task to optimize and deploy all images found in folder `src/img/**`. Result is copied to `dist/assets/img`
 */
gulp.task('images', function() {
  return gulp.src('src/img/**/*')
    .pipe(plumber())
    // .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/img'))
    // .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('vendor', function() {
  var bowerFile = require('./bower.json');
  var bowerDir = './client/lib';
  var bowerPackages = [];

  // assume that all bower deps have to be included in the order they are listed in bower.json
  underscore.each(bowerFile.dependencies, function(version, name){
    var dir = bowerDir + '/' + name + '/';
    var bowerDepFile = require(dir + 'bower.json');
    var file = dir + bowerDepFile.main;
    var minfile = file.substring(0, file.length - 3) + '.min.js';
    console.log("file", file);
    console.log("minfile", minfile);

    if (fs.existsSync(minfile)) {
      // use min version
      console.log("use min");
      bowerPackages.push(minfile);
    } else {
      // unminified
      console.log("use file");
      bowerPackages.push(file);
    }
  });

  gulp.src(bowerPackages)
    .pipe(plumber())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist/static/js'))
});

gulp.task('scripts', function() {
  gulp.src(['src/javascript/app.js', 'src/javascript/directives/*.js', 'src/javascript/services/*.js', 'src/javascript/controllers/*.js'])
    .pipe(plumber())
    // .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/static/js'))
});

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


/**
 * Task to start a Express server on port 4000 and used the live reload functionality.
 * Depends on: webserver, live-reload
 */
gulp.task('serve', ['webserver', 'live-reload'], function(){});

gulp.task('lint', function() {
  gulp.src(['src/javascript/controllers/*.js', 'src/javascript/services/*.js', 'src/javascript/*.js'])
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

/**
 * Cleanup task. Removes the dist folder.
 */
gulp.task('clean', function () {
  del([
    // here we use a globbing pattern to match everything inside the dist folder
    'dist/**'
  ]);
});

gulp.task('watch', function() {
  gulp.watch("src/scss/*.scss", ['sass']);
  gulp.watch("src/javascript/**/*.js", ['scripts', 'lint']);
  gulp.watch("src/index.html", ['minify-html']);
  gulp.watch("src/partials/*.html", ['minify-partials']);
  gulp.watch('src/img/**/*', ['images']);
});

gulp.task('default', ['vendor', 'scripts', 'minify-html', 'minify-partials', 'sass', 'serve']);
