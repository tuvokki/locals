# Load all required libraries.
gulp        = require 'gulp'
gulpif      = require 'gulp-if'
coffee      = require 'gulp-coffee'
sass        = require 'gulp-sass'
prefix      = require 'gulp-autoprefixer'
cssmin      = require 'gulp-minify-css'
minifyHTML  = require 'gulp-minify-html'
concat      = require 'gulp-concat'
del         = require 'del'
plumber     = require 'gulp-plumber'
jshint      = require 'gulp-jshint'
coffeelint  = require 'gulp-coffeelint'
stylish     = require 'jshint-stylish'
fs          = require 'fs'
underscore  = require 'underscore'

#also require the webserver and live-reload related tasks
require './gulp-serve.coffee'

# Create the prerequisites for the actual app
# 
# depends on:
#   vendor
#   app
gulp.task 'scripts', ['vendor', 'app']

# vendor task - retrieves the dependencies from the bower
# definition and concatenates then onto vendor.js
gulp.task 'vendor', ->
  bowerFile = require './bower.json'
  bowerDir = './client/lib'
  bowerPackages = []

  underscore.each bowerFile.dependencies, (version, name) ->
    dir = bowerDir + '/' + name + '/'
    bowerDepFile = require dir + 'bower.json'
    file = dir + bowerDepFile.main
    minfile = file.substring(0, file.length - 3) + '.min.js'
    # console.log "file", file
    # console.log "minfile", minfile

    if fs.existsSync minfile 
      # use min version
      # console.log "use min"
      bowerPackages.push minfile
    else
      # unminified
      # console.log "use file"
      bowerPackages.push file

  gulp.src bowerPackages
    .pipe plumber()
    .pipe concat('vendor.js')
    .pipe gulp.dest 'dist/static/js'

# app task - concatenates all application code into app.js
gulp.task 'app', ->
  gulp.src ['src/javascript/app.js',
            'src/javascript/directives/*.js',
            'src/javascript/services/*',
            'src/javascript/controllers/*.js'
           ]
    .pipe plumber()
    .pipe gulpif /[.]coffee$/, coffee({bare: true})
      # .on('error', gutil.log))
    # .pipe(uglify())
    .pipe concat('app.js')
    .pipe gulp.dest 'dist/static/js'


# Create CSS - compiles the sass sources into styles.css
gulp.task 'css', ->
  gulp.src 'src/scss/styles.scss'
    .pipe plumber()
    .pipe sass()
    .pipe prefix "> 1%"
    .pipe cssmin keepSpecialComments: 0
    .pipe gulp.dest 'dist/static/css'

# Create HTML
# 
# depends on:
#   minify-html
#   minify-partials
gulp.task 'html', ['minify-html', 'minify-partials']

# minify-html task - minifies the html sources
gulp.task 'minify-html', ->
  opts = {empty:true,spare:true}
  gulp.src 'src/*.html'
    .pipe plumber()
    .pipe minifyHTML(opts)
    .pipe gulp.dest 'dist'

# minify-partials task - minifies partials html sources
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

# watch task - watches changes in files and runs tasks on changes
# 
# depends on:
#   css
#   scripts
#   lint
#   minify-html
#   minify-partials
gulp.task 'watch', ->
  gulp.watch "src/scss/*.scss", ['css']
  gulp.watch "src/javascript/**/*.js", ['scripts', 'lint']
  gulp.watch "src/javascript/**/*.coffee", ['scripts', 'clint']
  gulp.watch "src/index.html", ['minify-html']
  gulp.watch "src/partials/*.html", ['minify-partials']
  #gulp.watch 'src/img/**/*', ['images']

# coffee lint - checks the produced coffee files
gulp.task 'clint', ->
  gulp.src './src/javascript/**/*.coffee'
      .pipe coffeelint()
      .pipe coffeelint.reporter()

# lint task - checks the produced javascript
gulp.task 'lint', ->
  gulp.src ['src/javascript/**/*.js']
    .pipe plumber()
    .pipe jshint()
    .pipe jshint.reporter stylish

# Remove generated sources
gulp.task 'clean', ->
  del.sync ['dist/**']

gulp.task 'build', ['clean'], ->
  gulp.start 'css', 'scripts', 'html', 'resources'

# Default task call every tasks created so far.
gulp.task 'default', ['scripts', 'css', 'html', 'resources']