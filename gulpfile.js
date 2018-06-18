const gulp          = require('gulp');
const sass          = require('gulp-sass');
const sourcemaps    = require('gulp-sourcemaps');
const autoprefixer  = require('gulp-autoprefixer');
const uglify        = require('gulp-uglify');
const babel         = require('gulp-babel');
const plumber       = require('gulp-plumber');
const ejs           = require('gulp-ejs');
const htmlbeautify  = require('gulp-html-beautify');
const notify        = require('gulp-notify');
const changed       = require('gulp-changed');
const ignore        = require('gulp-ignore');
const webpack       = require('webpack');
const webpackStream = require('webpack-stream');
const aigis         = require('gulp-aigis');
const browserSync   = require('browser-sync').create();

const baseDir = {
  dest: 'dist',
  sass: 'src/**/*.scss',
  ejs: ['src/**.ejs', 'src/**/*.ejs', '!src/**/_*.ejs', '!src/styleguide/**/*.ejs'],
  js: 'src/**/*.js',
  img: 'src/**/*.{png,jpg,gif,svg}',
  aigis: 'aigis_config.yml',
  copy: [
    'src/**/*',
    '!src/_**',
    '!src/**/*.scss',
    '!src/**/*.js',
    '!src/*.ejs',
    '!src/**/*.ejs',
    '!src/styleguide/**',
    '!src/*.+(jpg|png|gif|svg)'
  ]
}

const webpackConfig = require('./webpack.config');

//sassコンパイル
gulp.task('sass', () => {
  return gulp.src(baseDir.sass)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    .pipe(autoprefixer({
      browsers: [
        'last 2 version',
        'Explorer >= 11',
        'iOS >= 8.1',
        'Android >= 4.4'
      ],
      cascade: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(baseDir.dest))
    .pipe(browserSync.stream());
});


gulp.task('ejs', () => {
  return gulp.src(baseDir.ejs)
    // .pipe(changed(baseDir.dest))
    .pipe(plumber())
    .pipe(ejs({}, {}, {
      'ext': '.html'
    }))
    .pipe(htmlbeautify({
      indent_size: 2,
      max_preserve_newlines: 0
    }))
    .pipe(gulp.dest(baseDir.dest))
    .pipe(browserSync.stream());
});

//babel
gulp.task('babel', () => {
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest(baseDir.dest))
    .pipe(browserSync.stream());
});

gulp.task('guide', () => {
  return gulp.src(baseDir.aigis)
    .pipe(aigis());
});

gulp.task('copy', () => {
  return gulp.src(baseDir.copy)
    .pipe(ignore.include({isFile: true}))
    .pipe(gulp.dest(baseDir.dest))
});

gulp.task('watch', () => {
  browserSync.init({
    server: {
      baseDir: baseDir.dest
    }
  });

  gulp.watch([baseDir.sass], ['sass']);
  gulp.watch([baseDir.sass], ['guide']);
  gulp.watch(['src/*.ejs','src/**/*.ejs'], ['ejs']);
  gulp.watch([baseDir.js], ['babel']);
  gulp.watch([baseDir.copy], ['copy']);
});

gulp.task('default', ['copy','sass','ejs','babel','watch']);
