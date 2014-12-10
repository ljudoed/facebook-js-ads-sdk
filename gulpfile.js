/* jshint node:true */
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('jscs', function () {
  return gulp.src(['src/**/*.js','test/**/*.js'])
        .pipe($.jscs());
});

gulp.task('jshint', function () {
  return gulp.src(['src/**/*.js','test/**/*.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('test', function () {
  return gulp.src('test/**/*.js', {read: false})
    .pipe($.mocha({reporter: 'nyan'}));
});

gulp.task('watch', function () {
  gulp.watch(['src/**/*.js','test/**/*.js'], ['jscs', 'jshint','test']);
});

gulp.task('default', function () {
  gulp.start('watch');
});

gulp.task('all', function () {
  gulp.start(['jscs', 'jshint','test']);
});