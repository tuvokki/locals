var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync'),
    minifyHTML  = require('gulp-minify-html'),
    concat      = require('gulp-concat'),
    clean       = require('gulp-clean'),
    uglify      = require('gulp-uglify');

gulp.task('sass', function () {
  gulp.src('src/scss/styles.scss')
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
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('dist'))
});

gulp.task('minify-partials', function() {
  var opts = {empty:true,spare:true};

  gulp.src('src/partials/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('dist/partials'))
});

gulp.task('vendor', function() {
  gulp.src(['src/javascript/vendor/angular.min.js', 'src/javascript/vendor/angular-route.min.js'])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist/static/js'))
});

gulp.task('scripts', function() {
  gulp.src(['src/javascript/app.js', 'src/javascript/services/*.js', 'src/javascript/controllers/*.js'])
    .pipe(concat('app.js'))
    // .pipe(uglify())
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
 * Cleanup task. Removes the dist folder.
 */
gulp.task('clean', function () {  
  gulp.src('dist', {read: false})
    .pipe(clean({force: true}))
    .pipe(clean());
});

gulp.task('default', ['vendor', 'scripts', 'minify-html', 'minify-partials', 'sass', 'browser-sync'], function () {
  gulp.watch("src/scss/*.scss", ['sass']);
  gulp.watch("src/javascript/**/*.js", ['scripts']);
  gulp.watch("src/index.html", ['minify-html']);
  gulp.watch("src/partials/*.html", ['minify-partials']);
});
