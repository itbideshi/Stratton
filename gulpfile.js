var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var include = require('gulp-include-template');
var browserSync = require('browser-sync').create();

gulp.task('serve', ['sass', 'includeTemplate'], function() {
    browserSync.init({
        server: "./devBuild"
    });

    gulp.watch(["./source/scss/*.scss","./source/templates/*/*.scss"], ['sass']);
    gulp.watch(["./source/templates/*/*.html", "./source/*.html"], ['includeTemplate']);
    gulp.watch("./devBuild/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src("./source/scss/*.scss")
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("./devBuild/stylesheets/"))
        .pipe(browserSync.stream());
});

gulp.task("includeTemplate", function() {
    return gulp.src("./source/*.html")
        .pipe(include())
        .pipe(gulp.dest("./devBuild/"));
});


gulp.task('default', ['serve']);