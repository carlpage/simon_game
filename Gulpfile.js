const gulp = require('gulp'),
      sass = require('gulp-sass'),
      browserSync = require('browser-sync').create(),
      cleanCSS = require('gulp-clean-css'),
      notify = require('gulp-notify'),
      imagemin = require('gulp-imagemin'),
      stripDebug = require('gulp-strip-debug'),
      uglify = require('gulp-uglify'),
      babel = require('gulp-babel'),
      rename = require('gulp-rename'),
      plumber = require('gulp-plumber'),
      gutil = require('gulp-util'),
      autoprefixer = require('gulp-autoprefixer');

const plumberErrorHandler = {
    errorHandler: notify.onError({
        title: 'Gulp',
        message: 'Error: <%= error.message %>'
    })
};

gulp.task('styles', function () {
    gulp.src('./dev/scss/main.scss')
        .pipe(plumber(plumberErrorHandler))
        .pipe(sass())
        .pipe(rename({ suffix: '.min' }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ level: 2 }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('scripts', function () {
    gulp.src(['./dev/scripts/**.js', '!./dist/js/*/min.js'])
        .pipe(plumber(plumberErrorHandler))
        .pipe(rename({ suffix: '.min' }))
        // .pipe(stripDebug())
        .pipe(babel({ presets: ['env'] }))
        .pipe(uglify().on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
            this.emit('end');
        }))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('html', function () {
    gulp.src(['./**.html'])
        .pipe(plumber(plumberErrorHandler))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./dev/scripts/*.js', ['scripts']);
    gulp.watch('./dev/scss/*.scss', ['styles']);
    gulp.watch('./*.html', ['html']);
});

gulp.task('default', ['styles', 'html', 'scripts', 'serve']);
