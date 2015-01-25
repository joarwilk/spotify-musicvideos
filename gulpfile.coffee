gulp = require 'gulp'
gutil = require 'gulp-util'
stylus = require('gulp-stylus')
nib = require('nib')
imagemin = require 'gulp-imagemin'
coffeelint = require 'gulp-coffeelint'
coffee = require 'gulp-coffee'
notify = require 'gulp-notify'
concat = require 'gulp-concat'
uglify = require 'gulp-uglify'
cache = require 'gulp-cache'
clean = require 'gulp-clean'
gulp = require 'gulp'
taskListing = require 'gulp-task-listing'
runSequence = require 'run-sequence'

sources =
  fonts: './app/fonts/*.*'
  styles: './app/**/*.styl'
  html: ['./app/*.html', './app/**/*.html', 'app/manifest.json']
  scripts: ['./app/**/!(main)*.coffee', './app/**/main.coffee']
  images: ['./app/**/*.jpg', './app/**/*.png']

destinations =
  css: 'dist/css'
  html: 'dist/'
  js: 'dist/js'

gulp.task('help', taskListing);


gulp.task 'style', ->
  gulp.src(sources.styles)
  .pipe(stylus({use: [nib()]}).on('error', gutil.log))
  .pipe(concat('main.css'))
  .pipe(gulp.dest(destinations.css))

gulp.task 'fonts', ->
  gulp.src(sources.fonts)
  .pipe(gulp.dest('dist/css'))

gulp.task "views", ->
  gulp.src(sources.html)
  .pipe(gulp.dest("dist/"))

gulp.task 'lint', ->
  gulp.src(sources.scripts)
  .pipe(coffeelint({
    "max_line_length": 131
  }))
  .pipe(coffeelint.reporter())

gulp.task 'src', ->
  gulp.src('app/scripts/*.js')
  .pipe(gulp.dest(destinations.js))
  gulp.src(sources.scripts)
  .pipe(coffee({bare: true}).on('error', gutil.log))
  .pipe(concat('app.js'))
  #.pipe(uglify())
  .pipe(gulp.dest(destinations.js))

gulp.task 'images', ->
  gulp.src(sources.images)
    #.pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/'))
    #.pipe(notify({ message: 'Updated images' }));


gulp.task 'watch', ->
  gulp.watch sources.images, ['images']
  gulp.watch sources.styles, ['style']
  gulp.watch sources.scripts, ['lint', 'src']
  gulp.watch sources.html, ['views']

gulp.task 'clean', ->
  gulp.src(['dist/'], {read: false}).pipe(clean())

gulp.task 'build', ->
  runSequence 'clean', ['style', 'fonts', 'lint', 'src', 'views', 'images']

gulp.task 'default', ['build', 'watch']
