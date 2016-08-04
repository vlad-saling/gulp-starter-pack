// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sassLint = require('gulp-sass-lint');
var copyDir = require('copy-dir');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('sasslint', function () {
  return gulp.src('src/css/**/*.s+(a|c)ss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

// Sass Task
gulp.task('sass:dev', function() {
    return gulp.src('src/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build-dev/css'));
});

// Sass Task
gulp.task('sass:prod', function() {
    return gulp.src('src/css/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('build-prod/css'));
});

// Concatenate & Minify JS
gulp.task('scripts:dev', function() {
    // gulp.src lets you specify file order
    return gulp.src(['src/js/script.js','src/js/module/module.js'])
        .pipe(concat('script.js',{newLine: ';'}))
        .pipe(gulp.dest('build-dev/js'))
        .pipe(uglify())
        .pipe(gulp.dest('build-dev/js'));
});

// Concatenate & Minify JS
gulp.task('scripts:prod', function() {
    // gulp.src lets you specify file order
    return gulp.src(['src/js/script.js','src/js/module/module.js'])
        .pipe(concat('script.js',{newLine: ';'}))
        .pipe(gulp.dest('build-prod/js'))
        .pipe(uglify())
        .pipe(gulp.dest('build-prod/js'));
});

gulp.task('copy:dev', function() {
    gulp.src(['src/html/**/*']).pipe(gulp.dest('build-dev/html'));
});

gulp.task('copy:prod', function() {
    gulp.src(['src/html/**/*']).pipe(gulp.dest('build-prod/html'));
});

// Default Task
gulp.task('css:dev', ['sasslint', 'sass:dev']);
gulp.task('css:prod', ['sasslint', 'sass:prod']);
gulp.task('build:dev', ['lint', 'css:dev', 'scripts:dev', 'copy:dev']);
gulp.task('build:prod', ['lint', 'css:prod', 'scripts:prod', 'copy:prod']);