# Load all required libraries.
gulp       = require 'gulp'
sass       = require 'gulp-sass'
prefix     = require 'gulp-autoprefixer'
cssmin     = require 'gulp-minify-css'
minifyHTML = require 'gulp-minify-html'

# Create your CSS from Sass, Autoprexif it to target 99%
#  of web browsers, minifies it.
gulp.task 'css', ->
  gulp.src 'src/scss/styles.scss'
    .pipe sass()
    .pipe prefix "> 1%"
    .pipe cssmin keepSpecialComments: 0
    .pipe gulp.dest 'www/css'

# Create you HTML from Jade, Adds an additional step of
#  minification for filters (like markdown) that are not
#  minified by Jade.
gulp.task 'html', ->
  opts = {empty:true,spare:true}
  gulp.src 'src/*.html'
    .pipe minifyHTML(opts)
    .pipe gulp.dest 'dist'

# Copy the fonts using streams.
gulp.task 'copy', ->
  gulp.src 'src/fonts/*'
    .pipe gulp.dest 'dist/static/css/fonts'

# Default task call every tasks created so far.
gulp.task 'default', ['css', 'html', 'copy']