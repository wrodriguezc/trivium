
// Gulp Dependencies
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var jshint 	= require('gulp-jshint');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');

//File system functions
var del = require('del');
var mkdirSync = require('graceful-fs').mkdirSync;

//Compilation variables
var scriptsDirectory            = 'scripts';
var cssDirectory                = 'css';
var rootDirectory               = 'site';
var destinationDirectory        = 'site/wwwroot';
var productname                 = 'trivium';

gulp.task('clean', function() {
  del.sync([rootDirectory], { force : true });
  mkdirSync(rootDirectory);  
  mkdirSync(destinationDirectory);
});

gulp.task('copy-html', function() {
  return gulp.src('html/**')
    .pipe(gulp.dest(destinationDirectory));
});

gulp.task('copy-assets', function() {
  return gulp.src('assets/**')
    .pipe(gulp.dest(destinationDirectory + '/assets'));
});

gulp.task('compile-css-release', function() {
  return gulp.src( cssDirectory + '/main.css')
    .pipe(cssnano({
      reduceIdents: {
        keyframes: false
      }
    }))
    .pipe(rename(productname + '.css'))     
    .pipe(gulp.dest(destinationDirectory + '/assets/css'));    
});

gulp.task('compile-css', function() {
  return gulp.src( cssDirectory + '/main.css')
    .pipe(rename(productname + '.css'))     
    .pipe(gulp.dest(destinationDirectory + '/assets/css'));    
});

gulp.task('compile-js', function() {
  return gulp.src( scriptsDirectory + '/main.js')
    .pipe(browserify({}))  
    .pipe(rename(productname + '.js')) 
    .pipe(gulp.dest(destinationDirectory + '/assets/js'));
});

gulp.task('compile-js-release', function() {
  return gulp.src( scriptsDirectory + '/main.js')
    .pipe(browserify({}))
    .pipe(uglify({})) 
    .pipe(rename(productname + '.js')) 
    .pipe(gulp.dest(destinationDirectory + '/assets/js'));
});

gulp.task('lint-js', function () {
  return gulp.src(scriptsDirectory + '/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//Default task
gulp.task('release', ['clean', 'lint-js', 'compile-js-release', 'compile-css-release', 'copy-assets', 'copy-html']);
gulp.task('default', ['clean', 'lint-js', 'compile-js', 'compile-css', 'copy-assets', 'copy-html']);
