/**
 * Created by Sugar on 2016/9/14.
 */
'use strict'

var gulp = require('gulp');
var less = require('gulp-less');
var sass = require('gulp-sass');
var scss = require('gulp-scss');
var imagemin = require("gulp-imagemin");
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

/*
 * less文件编译
 * */
gulp.task('testLess', function () {
    gulp.src('app/less/*.less') //该任务针对的文件
      .pipe(less()) //该任务调用的模块
      .pipe(gulp.dest('app/css')); //将会在app/css下生成css
});

/*
 * sass文件编译
 * */
gulp.task('testSass', function () {
    return gulp.src('app/sass/*.sass')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('app/css'));
});

/*
 * scss文件编译
 * */
gulp.task('testScss', function () {
    gulp.src('app/scss/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('app/css'));
});

/*
 * 监听less文件，自动编译
 * */
gulp.task('lessWatch', function () {
    gulp.run('testLess');
    gulp.watch(['app/less/*.less'], function () {
        gulp.run('testLess');
    })
});

/*
 * 监听sass文件，自动编译
 * */
gulp.task('sassWatch', function () {
    gulp.run('testSass');
    gulp.watch(['app/sass/*.sass'], function () {
        gulp.run('testSass');
    })
});

/*
 * 监听scss文件，自动编译
 * */
gulp.task('scssWatch', function () {
    gulp.run('testScss');
    gulp.watch(['app/scss/*.scss'], function () {
        gulp.run('testScss');
    })
});


/*
 *图片压缩
 * */
gulp.task('minImage', function () {
    gulp.src('app/img/*.*')
      .pipe(imagemin())
      .pipe(gulp.dest('app/img/dist'));
});

/*
 * js压缩
 * */
gulp.task('minJs', function () {
    gulp.src('app/js/min/*.js')
      .pipe(jsmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('app/js/min/dist'));
});


// 监视文件改动并重新载入
gulp.task('serve', ['scssWatch'], function () {
    browserSync({
        server: {
            baseDir: 'app'
        }
    });

    gulp.watch('app/scss/*.scss', ['scssWatch']);
    gulp.watch([
        '*.html',
        'css/**/*.css',
        'js/**/*.js',
        'less/**/*.less',
        'sass/**/*.sass',
        'scss/**/*.scss',
        'img/**/*.png',
        'img/**/*.jpg'
    ], {cwd: 'app'}, reload);
});

//gulp.task('default',['lessWatch','sassWatch', 'scssWatch']); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务
gulp.task('default', ['serve', 'scssWatch']);
