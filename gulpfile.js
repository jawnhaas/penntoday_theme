var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    prefix      = require('gulp-autoprefixer'),
    concat      = require('gulp-concat'),
    babel       = require('gulp-babel'),
    shell       = require('gulp-shell');

gulp.task('sass', function () {
  gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
        .pipe(sass({
          includePaths: [require('ups-mixin-lib').includePaths],
          outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(prefix('last 2 version'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('browser-sync', ['sass', 'scripts'], function() {
   browserSync.init({
     // Change as required, also remember to set in theme settings
     proxy: "penntoday.lndo.site",
     port: 8000
   });
});

gulp.task('scripts', function() {
  return gulp.src(['./src/js/*.js'])
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(concat('main.js'))
  .pipe(gulp.dest('./js'))
  .pipe(browserSync.reload({stream:true}));
});

gulp.task('drush', shell.task([
  'drush cache-clear theme-registry'
]));

gulp.task('watch', function(){
    gulp.watch('./src/scss/**/*.scss', ['sass']);
  //  gulp.watch('./src/js/**/*.js', ['scripts']);
    gulp.watch('./templates/**/*.php',['drush']);
});

gulp.task('default', ['browser-sync', 'watch']);
