const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const csscomb = require('gulp-csscomb');
//const ejs = require('gulp-ejs');
//const babel = require('gulp-babel');
const imagemin = require("gulp-imagemin");
const uglify = require('gulp-uglify');
const pump = require('pump');
const browserSync = require('browser-sync').create();

//sassコンパイル
gulp.task('sass', () => {
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

gulp.task('uglify', () => {
  gulp.src('src/**/*.js')
    .pipe(uglify({preserveComments: 'license'}))
    .pipe(gulp.dest('html'));
});

//画像圧縮
gulp.task('imagemin', () => {
  gulp.src([
    "src/**/*.jpg",
    "src/**/*.png"
  ])
    .pipe(imagemin())
    .pipe(gulp.dest("html"));
});

gulp.task('copy', () => {
  return gulp.src([
    'src/**/*',
    '!src/**/*.scss'
  ])
    .pipe(gulp.dest('html'))
    .pipe(browserSync.stream());
});

gulp.task('watch', () => {
  browserSync.init({
    server: {
      baseDir: "html"
    }
  });

  gulp.watch(['src/**/*.scss'], ['sass']);
  gulp.watch(['src/**/*.js'], ['uglify']);
  gulp.watch(['src/**/*.jpg'], ['imagemin']);
  gulp.watch(['src/**/*.png'], ['imagemin']);
  gulp.watch([
    'src/**/*',
    '!src/**/*.scss'
    ], ['copy']);
});

gulp.task('default', ['copy', 'sass', 'watch', 'imagemin', 'uglify']);
