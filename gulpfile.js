const { src, dest, watch, parallel, series} = require('gulp');


const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const clean = require('gulp-clean');

const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
// const cache = require('gulp-cached');

const svgSprite = require('gulp-svg-sprite');

const include = require('gulp-include');


function fonts() {
    return src('app/fonts/src/*.*')
        .pipe(fonter({
            formats: ['woff', 'ttf']
        }))
        .pipe(dest('app/fonts'))
        .pipe(src('app/fonts/*.ttf'))
        .pipe(ttf2woff2())
        .pipe(dest('app/fonts'));
}

function sprite(){
    return src('app/images/src/*.svg')
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: '../sprite.svg',
                example: true 
            }
        }
    }))
    .pipe(dest('app/images'))
}

//скрипты
function scripts() {
    return src([
        'node_modules/swiper/swiper-bundle.min.js',
        'app/js/main.js'
        
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))


        .pipe(browserSync.stream());
}

//Стили
function styles () {

    return src('app/scss/style.scss')
        .pipe(postcss([ autoprefixer({overrideBrowserslist: ['last 10 version']}) ]))
        .pipe(concat('style.min.css'))
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(dest('app/css'))


        .pipe(browserSync.stream());

}



//просмотр страниц
function watching() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
    watch(['app/scss/style.scss'], styles)
    watch(['app/js/main.js'], scripts)
    watch(['app/components/*', 'app/pages/*'], pages)
    watch(['app/*.html']).on('change', browserSync.reload)
}


//удаление папки для автоматического заполнения
function cleanDist() {
    return src('dist')
        .pipe(clean())
}

//добавление файлов в папку build
function building(){
    return src([
        'app/css/style.min.css',
        'app/images/src/*.*',
        '!app/images/src/*.svg',
        'app/images/sprite.svg',
        'app/fonts/*.*',
        'app/js/main.min.js',
        'app/**/*.html'
    ],{base : 'app'})
    .pipe(dest('dist'))
}


function pages(){
    return src('app/pages/*.html')
        .pipe(include({
            includePaths: 'app/components'
        }))
        .pipe(dest('app'))
        .pipe(browserSync.stream())
}

exports.styles = styles;
exports.sprite = sprite;
exports.fonts = fonts;
exports.pages = pages;
exports.building = building;
exports.scripts = scripts;
exports.watching = watching;

exports.build = series(cleanDist, building);

exports.default = parallel(styles, scripts, pages, watching);