
var gulp               = require('gulp');             
var uglify             = require('gulp-uglify'); 
var sass               = require('gulp-sass');
var cssmin             = require('gulp-clean-css');
var imagemin           = require("gulp-imagemin"); 
var srcPath            = 'templates/src/';            // Path to the source files
var distPath           = 'templates/dist/';            // Path to the distribution files


// Paths that gulp should watch
var watchPaths        = {
    scripts:     [
        srcPath+'assets/js/*.js',
        srcPath+'assets/js/**/*.js'
    ],
    images:     [
        srcPath+'assets/img/**'
    ],
    sass:         [
        srcPath+'assets/sass/*.scss',
        srcPath+'assets/sass/**/*.scss'
    ],
    fonts:      [
        srcPath+'assets/fonts/**'
    ]
};

// Task for sass files
gulp.task('sass', function () {
    gulp
        .src(srcPath + 'assets/sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin({ keepBreaks: false }))
        .pipe(gulp.dest(distPath + 'assets/css'));
});

// Javscript task
gulp.task('scripts', function(){
    gulp
        .src(srcPath + 'assets/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(distPath + 'assets/js'));
});

// Font task
gulp.task('fonts', function () {
    gulp
        .src([srcPath + 'assets/fonts/**'])
        .pipe(gulp.dest(distPath + 'assets/fonts'));
});

// Images task
gulp.task('images', function () {
    gulp
        .src(srcPath + 'assets/img/**')
        .pipe(imagemin().on('error', sass.logError))
        .pipe(gulp.dest(distPath + 'assets/img'));
});

// Watch task
gulp.task('watch', function() {
    gulp.watch(watchPaths.scripts, ['scripts']);
    gulp.watch(watchPaths.images, ['images']);
    gulp.watch(watchPaths.sass, ['sass']);
    gulp.watch(watchPaths.fonts, ['fonts']);

});

// Default task
gulp.task('default', ['scripts', 'images', 'sass', 'fonts', 'watch']);