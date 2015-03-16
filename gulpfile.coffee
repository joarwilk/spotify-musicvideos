gulp = require 'gulp'
gutil = require 'gulp-util'
stylus = require 'gulp-stylus'
coffeelint = require 'gulp-coffeelint'
coffee = require 'gulp-coffee'
concat = require 'gulp-concat'
uglify = require 'gulp-uglify'
clean = require 'gulp-clean'
gulp = require 'gulp'
taskListing = require 'gulp-task-listing'
runSequence = require 'run-sequence'
sourcemaps = require('gulp-sourcemaps');
plumber = require('gulp-plumber');

mocha = require('gulp-mocha');

sources =
  styles: './app/**/*.styl'
  html: ['./app/*.html', './app/**/*.html', 'app/manifest.json']
  scripts: ['./app/**/!(main)*.coffee', './app/**/main.coffee']
  vendor: './app/scripts/vendor/*.js'
  js: './app/scripts/*.js'
  images: ['./app/**/*.jpg', './app/**/*.png']

destinations =
  css: 'dist/css'
  html: 'dist/'
  js: 'dist/js'

gulp.task('help', taskListing);

gulp.task 'test', ->
  gulp.src('test/test.js', {read: false})
  .pipe(mocha({reporter: 'nyan'}));


gulp.task 'style', ->
  gulp.src(sources.styles)
  .pipe(stylus().on('error', gutil.log))
  .pipe(concat('main.css'))
  .pipe(gulp.dest(destinations.css))

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
  gulp.src(sources.vendor)
  .pipe(gulp.dest('dist/js/vendor'))
  gulp.src(sources.js)
  .pipe(gulp.dest(destinations.js))

  gulp.src(sources.scripts)
  .pipe(plumber())
 # .pipe(sourcemaps.init())
  .pipe(coffee({bare: true}).on('error', ( -> )))
 # .pipe(sourcemaps.write())
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
  gulp.watch sources.js, ['lint', 'src']
  gulp.watch sources.vendor, ['lint', 'src']
  gulp.watch sources.html, ['views']

gulp.task 'clean', ->
  gulp.src(['dist/'], {read: false}).pipe(clean())

gulp.task 'build', ->
  runSequence 'clean', ['style', 'lint', 'src', 'views', 'images']

gulp.task 'default', ['build', 'watch']
