/**
 * Created by mao on 17-6-6.
 */
let gulp = require('gulp'),
    babel = require("gulp-babel"),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    merge = require('merge-stream'),
    minifyHTML = require("gulp-minify-html"),
    htmlreplace = require('gulp-html-replace');

gulp.task("default", ['javascript', 'css', 'fonts', 'img', 'html'], function () {
    let js = gulp.src(["temp/vendor.js", "temp/index.js"])
        .pipe(concat("bundle.min.js"))
        .pipe(gulp.dest("dist/js"));
    let css = gulp.src(["temp/vendor.css", "temp/index.css"])
        .pipe(concat("bundle.min.css"))
        .pipe(gulp.dest("dist/css"));
    return merge(js, css);
});

gulp.task('javascript', ['jslib'], function () {
    return gulp.src(['js/*.js'])
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat('index.js'))
        .pipe(gulp.dest('temp'));
});


gulp.task('jslib', function () {
    return gulp.src(["node_modules/materialize-css/node_modules/jquery/dist/jquery.min.js",
        "node_modules/materialize-css/dist/js/materialize.min.js",
        "node_modules/vue/dist/vue.min.js"])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('temp'));
});

gulp.task('css', ['csslib'], function () {
    return gulp.src('css/*.css')
        .pipe(minifycss())
        .pipe(concat('index.css'))
        .pipe(gulp.dest('temp'));

});


gulp.task('csslib', function () {
    return gulp.src(["node_modules/materialize-css/dist/css/materialize.min.css"])
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('temp'));
});

gulp.task('fonts', function () {
    return gulp.src(["node_modules/materialize-css/dist/fonts/roboto/*.*", "fonts/*.*"])
        .pipe(gulp.dest('dist/fonts/roboto'));
});

gulp.task('img', function () {
    return gulp.src(["img/*.*"])
        .pipe(gulp.dest('dist/img'));
});
gulp.task('html', function () {
    return gulp.src('*.html')
        .pipe(htmlreplace({
            'css': 'css/bundle.min.css',
            'js': 'js/bundle.min.js'
        }))
        .pipe(minifyHTML({comments: false, spare: false, quotes: true}))
        .pipe(gulp.dest('dist'));
});
