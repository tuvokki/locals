# Load all required libraries.
gulp        = require 'gulp'
sass        = require 'gulp-sass'
prefix      = require 'gulp-autoprefixer'
cssmin      = require 'gulp-minify-css'
minifyHTML  = require 'gulp-minify-html'
concat      = require 'gulp-concat'
del         = require 'del'
plumber     = require 'gulp-plumber'
jshint      = require 'gulp-jshint'
stylish     = require 'jshint-stylish'
fs          = require 'fs'
underscore  = require 'underscore'

# Create the prerequisites for the actual
# app and the app itself
gulp.task 'scripts', ['vendor', 'app']

gulp.task 'vendor', ->
  bowerFile = require './bower.json'
  bowerDir = './client/lib'
  bowerPackages = []

  underscore.each bowerFile.dependencies, (version, name) ->
    dir = bowerDir + '/' + name + '/'
    bowerDepFile = require dir + 'bower.json'
    file = dir + bowerDepFile.main
    minfile = file.substring(0, file.length - 3) + '.min.js'
    console.log "file", file
    console.log "minfile", minfile

    if fs.existsSync minfile 
      # use min version
      console.log "use min"
      bowerPackages.push minfile
    else
      # unminified
      console.log "use file"
      bowerPackages.push file

  gulp.src bowerPackages
    .pipe plumber()
    .pipe concat('vendor.js')
    .pipe gulp.dest 'dist/static/js'

gulp.task 'app', ->
  gulp.src ['src/javascript/app.js', 'src/javascript/directives/*.js', 'src/javascript/services/*.js', 'src/javascript/controllers/*.js']
    .pipe plumber()
    # .pipe(uglify())
    .pipe concat('app.js')
    .pipe gulp.dest 'dist/static/js'


# Create your CSS from Sass, Autoprexif it to target 99%
#  of web browsers, minifies it.
gulp.task 'css', ->
  gulp.src 'src/scss/styles.scss'
    .pipe plumber()
    .pipe sass()
    .pipe prefix "> 1%"
    .pipe cssmin keepSpecialComments: 0
    .pipe gulp.dest 'www/css'

# Create your HTML
gulp.task 'html', ['minify-html', 'minify-partials']

gulp.task 'minify-html', ->
  opts = {empty:true,spare:true}
  gulp.src 'src/*.html'
    .pipe plumber()
    .pipe minifyHTML(opts)
    .pipe gulp.dest 'dist'

gulp.task 'minify-partials', ->
  opts = {empty:true,spare:true}
  gulp.src 'src/partials/*.html'
    .pipe plumber()
    .pipe minifyHTML(opts)
    .pipe gulp.dest 'dist/partials'

# Copy static resources using streams.
gulp.task 'resources', ->
  gulp.src 'src/fonts/*'
    .pipe plumber()
    .pipe gulp.dest 'dist/static/css/fonts'

gulp.task 'watch', ->
  gulp.watch "src/scss/*.scss", ['sass']
  gulp.watch "src/javascript/**/*.js", ['scripts', 'lint']
  gulp.watch "src/index.html", ['minify-html']
  gulp.watch "src/partials/*.html", ['minify-partials']
  gulp.watch 'src/img/**/*', ['images']


# Remove generated sources
gulp.task 'clean', ->
  del ['dist/**']

# Default task call every tasks created so far.
gulp.task 'default', ['scripts', 'css', 'html', 'resources']