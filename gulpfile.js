const { src, dest, watch, series, parallel } = require('gulp');
//CSS SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

//IMAGENES

const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css( done ) {
    /*Compilar SASS*/
    /*Pasos: 1 identificar archivo 2 Compilar 3 guardar el CSS*/
    src('src/scss/app.scss')
        .pipe(sass())
        .pipe(postcss([autoprefixer(dev)]))
        .pipe(dest('build/css'))
    done();
}




function imagenes(done) {
    src('src/img/**/*')
        .pipe(imagemin())
        .pipe(dest('build/img'))
    done();
}


function versionWebp() {
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp())
        .pipe(dest('build/img'))
}

function versionAvif() {
     return src('src/img/**/*.{png,jpg}')
        .pipe(avif())
        .pipe(dest('build/img'))
}


function dev() {
    watch( 'src/scss/**/*.scss', css );
    watch( 'src/img/**/*', imagenes );
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
//exports.default = series(imagenes, versionWebp, versionAvif, css, dev);
exports.default = series(css, dev );

// series: Se inicia una tarea, y hasta que finaliza, inicia la siguiente

//parallel: Todas se inician al mismo tiempo