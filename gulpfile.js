var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var include = require('gulp-include-template');
var browserSync = require('browser-sync').create();

gulp.task('serve', ['sass', 'includeTemplate'], function() {
    browserSync.init({
        server: "./build"
    });

    gulp.watch("./source/scss/*.scss", ['sass']);
    gulp.watch(["./source/templates/*", "./source/*.html"], ['includeTemplate']);
    //gulp.watch("./build/*.html").on('change', browserSync.reload);
    gulp.watch("./build/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src("./source/scss/*.scss")
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("./build/stylesheets/"))
        .pipe(browserSync.stream());
});

gulp.task("includeTemplate", function() {
    return gulp.src("./source/*.html")
        .pipe(include())
        .pipe(gulp.dest("./build/"));
});

gulp.task('default', ['serve']);