var gulp = require('gulp');
var pug = require('gulp-pug');
var scss = require('gulp-sass');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var rigger = require('gulp-rigger');

var path = {
    build : {
        html : './build',
        css : './build/css',
        image : './build/images',
        font : './build/fonts',
        favicon : './build',
        js : './build/js'
    },
    src : {
        pug : './src/pugs/pages/*.pug',
        scss : './src/style/main.scss',
        image : './src/images/*.*',
        font : './src/fonts/*.*',
        favicon : './src/*.*',
        js : './src/js/main.js'
    },
    watch : {
        pug : './src/pugs/**/*.pug',
        scss : './src/style/**/*.scss',
        image : './src/images/*.*',
        font : './src/fonts/*.*',
        favicon : './src/*.*',
        js : './src/js/**/*.js'
    }
};
gulp.task('server', function() {
    browserSync({
        server : {
            baseDir : './build'
        }
    })
});
gulp.task('build:favicon', function() {
    gulp.src(path.src.favicon)
        .pipe(gulp.dest(path.build.favicon))
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('build:font', function() {
    gulp.src(path.src.font)
        .pipe(gulp.dest(path.build.font))
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('build:pug', function() {
    gulp.src([path.src.pug])
        .pipe(plumber())
        .pipe(pug({pretty: '\t'}))
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('build:scss', function() {
    gulp.src(path.src.scss)
        .pipe(scss())
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('build:image', function () {
    gulp.src(path.src.image) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.image))
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('build:js', function() {
   gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('watch', function() {
    watch(path.watch.pug, function() {
        gulp.start('build:pug')
    });
    watch(path.watch.scss, function() {
        gulp.start('build:scss')
    });
    watch(path.watch.scss, function() {
        gulp.start('build:image')
    });
    watch(path.watch.favicon, function() {
        gulp.start('build:favicon')
    });
    watch(path.watch.font, function() {
        gulp.start('build:font')
    });
    watch(path.watch.js, function() {
        gulp.start('build:js')
    });
});

gulp.task('build', ['build:pug', 'build:scss', 'build:image', 'build:favicon', 'build:font', 'build:js']);
gulp.task('default', ['build', 'server', 'watch']);
