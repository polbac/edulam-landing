const gulp = require('gulp');

// BrowserSync
const browserSync = require('browser-sync').create();

// Plugins CSS
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

// Plugins JS
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

// Plugins utilidades
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

// Rutas
const dirs = {
    devStyles: {
        src: 'src/sass',
        dist: 'css',
    },
    devScripts: {
        src: 'src/js',
        dist: 'js'
    },
    nodeModules: {
        bootstrap: './node_modules/bootstrap',
        jquery: './node_modules/jquery'
    }
};

// Inicializar BrowserSync
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: "."
        },
        open: true,
        injectChanges: true,
        notify: false,
        files: [
            './*.html',
            dirs.devStyles.src + '/**/*.scss'
        ]
    });
});

// Compilar SASS
gulp.task('dev:styles', function () {
    return gulp.src(dirs.devStyles.src + '/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            precision: 10,
            includePaths: ['.']
        }))
        .on('error', console.error.bind(console))
        .pipe(sourcemaps.write({ includeContent: false }))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dirs.devStyles.dist))
        .pipe(browserSync.reload({ stream: true }))
});

// Concatenar y minimizar JS
gulp.task('dev:scripts', function (done) {
    gulp.src([dirs.nodeModules.jquery + '/dist/jquery.min.js', dirs.nodeModules.bootstrap + '/dist/js/bootstrap.min.js', dirs.devScripts.src + '/*.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest(dirs.devScripts.dist))
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(dirs.devScripts.dist))
        .pipe(browserSync.reload({ stream: true }))
    done();
});

if (process.env.ENV === 'dev') {
    gulp.task('watch', ['dev:styles', 'dev:scripts', 'browserSync'], function () {
        gulp.watch(dirs.devStyles.src + '/**/*.scss', ['dev:styles']);
        gulp.watch(dirs.devScripts.src + '/**/*.js', ['dev:scripts']);
    });
}

gulp.task('default', process.env.ENV === 'dev' ?  ['watch'] : null, function (done) {
    done();
});
