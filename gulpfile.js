const gulp = require('gulp')
const sass = require('gulp-sass')
const sassGlob = require('gulp-sass-glob')
const sourcemaps = require('gulp-sourcemaps')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const plumber = require('gulp-plumber')
const ejs = require('gulp-ejs')
const htmlbeautify = require('gulp-html-beautify')
const notify = require('gulp-notify')
const ignore = require('gulp-ignore')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const browserSync = require('browser-sync').create()
const header = require('gulp-header')
const replace = require('gulp-replace')
const rename = require('gulp-rename')
const mode = require('gulp-mode')()
const del = require('del')

const baseDir = {
  dest: 'dist',
  sass: 'src/**/*.scss',
  ejs: [
    'src/**.ejs',
    'src/**/*.ejs',
    '!src/**/_*.ejs',
    '!src/styleguide/**/*.ejs',
  ],
  js: 'src/**/*.js',
  img: 'src/**/*.{png,jpg,gif,svg}',
  copy: [
    'src/**/*',
    '!src/_**',
    '!src/**/*.scss',
    '!src/**/*.js',
    '!src/*.ejs',
    '!src/**/*.ejs',
    '!src/styleguide/**',
    '!src/*.+(jpg|png|gif|svg)',
  ],
}

const webpackConfig = require('./webpack.config')

gulp.task('copy', () => {
  return gulp
    .src(baseDir.copy)
    .pipe(
      ignore.include({
        isFile: true,
      })
    )
    .pipe(gulp.dest(baseDir.dest))
})

gulp.task('sass', () => {
  return gulp
    .src(baseDir.sass)
    .pipe(mode.development(sourcemaps.init()))
    .pipe(sassGlob())
    .pipe(
      mode.development(
        sass({
          outputStyle: 'expanded',
        }).on('error', sass.logError)
      )
    )
    .pipe(
      mode.production(
        sass({
          outputStyle: 'compressed',
        }).on('error', sass.logError)
      )
    )
    .pipe(
      mode.development(
        sourcemaps.write({
          includeContent: false,
        })
      )
    )
    .pipe(
      mode.development(
        sourcemaps.init({
          loadMaps: true,
        })
      )
    )
    .pipe(
      plumber({
        errorHandler: notify.onError('<%= error.message %>'),
      })
    )
    .pipe(
      postcss([
        autoprefixer({
          grid: true,
          cascade: false,
        }),
      ])
    )
    .pipe(mode.production(replace(/@charset "UTF-8";/g, '')))
    .pipe(mode.production(header('@charset "UTF-8";\n\n')))
    .pipe(mode.development(sourcemaps.write('.')))
    .pipe(gulp.dest(baseDir.dest))
    .pipe(browserSync.stream())
})

gulp.task('ejs', () => {
  return gulp
    .src(baseDir.ejs)
    .pipe(plumber())
    .pipe(
      ejs(
        {
          Develop: mode.development(),
          Date: new Date().getTime(),
        },
        {
          rmWhitespace: true,
        }
      )
    )
    .pipe(rename({ extname: '.html' }))
    .pipe(
      htmlbeautify({
        indent_size: 2,
        max_preserve_newlines: 0,
      })
    )
    .pipe(gulp.dest(baseDir.dest))
    .pipe(browserSync.stream())
})

gulp.task('babel', () => {
  return webpackStream(
    {
      config: webpackConfig,
    },
    webpack
  )
    .on('error', function () {
      this.emit('end')
    })
    .pipe(gulp.dest(baseDir.dest))
    .pipe(browserSync.stream())
})

gulp.task('clean', () => {
  return del(['dist/'])
})

gulp.task('watch', () => {
  browserSync.init({
    server: {
      baseDir: baseDir.dest,
    },
  })

  gulp.watch([baseDir.sass], gulp.task('sass'))
  gulp.watch(['src/*.ejs', 'src/**/*.ejs'], gulp.task('ejs'))
  gulp.watch([baseDir.js], gulp.task('babel'))
  gulp.watch(baseDir.copy, gulp.task('copy'))
})

gulp.task('default', gulp.parallel('copy', 'sass', 'ejs', 'babel', 'watch'))

gulp.task('build', gulp.series('clean', 'copy', 'sass', 'ejs', 'babel'))
