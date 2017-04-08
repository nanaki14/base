var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csscomb = require('gulp-csscomb');
//var ejs = require('gulp-ejs');
//var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();


gulp.task('sass', function () {
  return gulp.src([
    'src/**/*.scss'
  ])
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: [
        'last 2 version',
        'Explorer >= 11',
        'iOS >= 8.1',
        'Android >= 4.4'
      ],
      cascade: false
    }))
    .pipe(csscomb())
    .pipe(gulp.dest('html'))
    .pipe(browserSync.stream());
});

gulp.task('copy', function () {
  return gulp.src([
    'src/**/*',
    '!src/**/*.scss'
  ])
    .pipe(gulp.dest('html'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function () {
  browserSync.init({
    server: {
      baseDir: "html"
    }
  });

  gulp.watch(['src/**/*.scss'], ['sass']);
  gulp.watch([
    'src/**/*',
    '!src/**/*.scss'
    ], ['copy']);
});

gulp.task('default', ['copy', 'sass', 'watch']);
