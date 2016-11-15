// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var assemble = require('assemble');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var extname = require('gulp-extname');
var jshint = require('gulp-jshint');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sassLint = require('gulp-sass-lint');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var app = assemble();

////////////////////////////////////////////////////////////////////////
//  Lint tasks : JS and CSS.
////////////////////////////////////////////////////////////////////////

gulp.task('scripts:lint', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
});

gulp.task('sass:lint', function () {
  return gulp.src('src/css/**/*.s+(a|c)ss')
    .pipe(sassLint({
      options: {
          formatter: 'stylish',
          'merge-default-rules': true
        },
        rules: {
            "space-after-comma": 0,
            "variable-name-format": 0,
            "leading-zero": 0,
            "space-after-colon" : 0,
            "space-before-colon" : 0,
            "indentation": 0,
            "no-vendor-prefixes" : 0,
            "property-sort-order" : 0,
            "mixins-before-declarations" : 0,
            "hex-length": 0,
            "no-trailing-zero": 0,
            "brace-style" : 0,
            "zero-unit" : 0,
            "no-color-literals" : 0,
            "mixin-name-format" : 0,
            "placeholder-name-format" : 0
        }
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

////////////////////////////////////////////////////////////////////////
// Sass Tasks : dev and prod.
////////////////////////////////////////////////////////////////////////

gulp.task('sass:dev', function() {
    return gulp.src('src/css/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('build-dev/css'));
});

gulp.task('sass:prod', function() {
    return gulp.src('src/css/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('build-prod/css'));
});

////////////////////////////////////////////////////////////////////////
// JS: (dev) SINGLE FILE : Concat and minify.
////////////////////////////////////////////////////////////////////////

gulp.task('scripts:dev', function() {
    // gulp.src lets you specify file order
    return gulp.src(['src/js/script.js','src/js/module/module.js'])
        .pipe(sourcemaps.init())
            .pipe(concat('script.js',{newLine: ';'}))
        .pipe(gulp.dest('build-dev/js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('build-dev/js'));
});

////////////////////////////////////////////////////////////////////////
// JS: (prod) SINGLE FILE : Concat and minify.
////////////////////////////////////////////////////////////////////////

gulp.task('scripts:prod', function() {
    // gulp.src lets you specify file order
    return gulp.src(['src/js/script.js','src/js/module/module.js'])
        .pipe(concat('script.js',{newLine: ';'}))
        .pipe(gulp.dest('build-prod/js'))
        .pipe(uglify())
        .pipe(gulp.dest('build-prod/js'));
});

////////////////////////////////////////////////////////////////////////
// JS: (dev) ANY JS, ANYWHERE ".source" files : Concat and minify.
////////////////////////////////////////////////////////////////////////
// Minimizes, removes ".source" from filename and puts the in the same structure from "src" to "build-dev".
// For example:  /src/js/widgets/mywidget.js  gets put in:   /build-prod/js/widgets/mywidget.js

gulp.task('js-build:dev', function() {
    return gulp.src('src/**/*.source.js', {base: "src/"})
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.basename = path.basename.replace(/.source/, "");
        }))     
        .pipe(gulp.dest("build-dev/"));
});

////////////////////////////////////////////////////////////////////////
// JS: (prod) ANY JS, ANYWHERE ".source" files : Concat and minify.
////////////////////////////////////////////////////////////////////////
// Minimizes, removes ".source" from filename and puts the in the same structure from "src" to "build-dev".
// For example:  /src/js/widgets/mywidget.source.js  gets put in:  /build-prod/js/widgets/mywidget.js

gulp.task('js-build:prod', function() {
    return gulp.src('src/**/*.source.js', {base: "src/"})
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.basename = path.basename.replace(/.source/, "");
        }))     
        .pipe(gulp.dest("build-prod/"));
});

////////////////////////////////////////////////////////////////////////
// Assemblers.
////////////////////////////////////////////////////////////////////////

gulp.task('load', function(cb) {
  app.partials('src/html/partials/**/*.hbs');
  app.pages('src/html/pages/**/*.html');
  cb();
});

gulp.task('render:dev', ['load'], function() {
    return app.toStream('pages')
    .pipe(app.renderFile())
    .pipe(extname())
    .pipe(app.dest('./build-dev/html/'));
});

gulp.task('render:prod', ['load'], function() {
    return app.toStream('pages')
    .pipe(app.renderFile())
    .pipe(extname())
    .pipe(app.dest('./build-prod/html/'));
});

////////////////////////////////////////////////////////////////////////
// Copy files.
////////////////////////////////////////////////////////////////////////

gulp.task('copy:dev', function() {
    gulp.src(['src/html/**/*']).pipe(gulp.dest('build-dev/html'));
});

gulp.task('copy:prod', function() {
    gulp.src(['src/html/**/*']).pipe(gulp.dest('build-prod/html'));
});

////////////////////////////////////////////////////////////////////////
// Watch : Automatically runs "build:dev" and all its tasks.
////////////////////////////////////////////////////////////////////////

gulp.task('watch', function() {
  gulp.watch('src/**/*', ['build:dev']);
});

////////////////////////////////////////////////////////////////////////
// System notification : So you know it worked and finished.
////////////////////////////////////////////////////////////////////////

gulp.task('notifydone', function() {
    return gulp.src('src').pipe(notify({
        message: "Build done."
    }));
});

////////////////////////////////////////////////////////////////////////
// Starts the web server so you can automatically preview your page.
////////////////////////////////////////////////////////////////////////

gulp.task('connect', function() {
  connect.server({
    root: './build-dev/',
    port: 8080
  });
});


////////////////////////////////////////////////////////////////////////
// Tasks.
////////////////////////////////////////////////////////////////////////

gulp.task('css:dev', ['sass:lint', 'sass:dev']);
gulp.task('css:prod', ['sass:prod']);
gulp.task('build-static:dev', ['scripts:lint', 'css:dev', 'scripts:dev', 'js-build:dev', 'copy:dev', 'notifydone']);
gulp.task('build-static:prod', ['css:prod', 'scripts:prod', 'js-build:prod', 'copy:prod', 'notifydone']);
gulp.task('build:dev', ['scripts:lint', 'css:dev', 'scripts:dev', 'js-build:dev', 'render:dev', 'notifydone']);
gulp.task('build:prod', ['css:prod', 'scripts:prod', 'js-build:prod', 'render:prod', 'notifydone']);
gulp.task('server', ['build:dev', 'connect', 'watch']);