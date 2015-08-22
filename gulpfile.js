var gulp = require("gulp");
var uglify = require('gulp-uglify'); //uglify js
var minifyCss = require('gulp-minify-css'); //minify css
 
//uglify  js
gulp.task('compress', function() {
  return gulp.src('public/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/js/dist'));
});

//minify css
gulp.task('minify-css', function() {
  return gulp.src('public/css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('public/css/dist'));
});

//watch files for changes
gulp.task('watch', function() {
    gulp.watch('public/js/*.js', ['compress']);
    gulp.watch('public/css/*.css', ['minify-css']);
});

//default tasks when running - gulp
gulp.task('default', ['compress', 'minify-css']);