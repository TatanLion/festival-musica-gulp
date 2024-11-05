/*Cuando no hay llaves luego del const es porque solo hay una funcion, cuando hay llaves es porque importa solo esa funcion pero hay mas*/
const {series, src, dest, watch, parallel}  = require('gulp');
const sass = require('gulp-dart-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify')
const webp = require('gulp-webp');
const concat = require('gulp-concat');

//Utilidades CSS
const autoprefixer = require('autoprefixer'); //Creamos prefijos en la hoja de estilos donde sea necesario
const postcss = require('gulp-postcss'); //Creamos prefijos en la hoja de estilos donde sea necesario
const cssnano = require('cssnano'); //Esto nos minifica el css y lo vuelve mas rapido
const sourcemaps = require('gulp-sourcemaps');

//Utilidades JS
const terser = require ('gulp-terser-js');
const rename = require('gulp-rename');

//Funcion que compila Sass

//Asi ahorramos codigo
const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}

function css(){
    return src(paths.scss) //Le decimos donde encontrar la ruta del archivo.
        .pipe(sourcemaps.init()) //Aqui le indicamos que inicie le sourcemaps
        .pipe(sass()) //Aqui solo lo compila
        .pipe(postcss( [autoprefixer(), cssnano() ])) //Tenemos que usarlo aqui antes de que lo exporte a esa ruta y luego de que paso por sass // De igual manera requiere el archivo postcss.config.js para que funcione correctamente
        .pipe(sourcemaps.write('.')) //Aqui hacemos que nos indique en que linea del sass esta el codigo por si lo requerimos modificar y creara un nuevo archivo
        .pipe(dest('./build/css')) //Y luego de compilarlo lo guarde en esta ruta como ya un css
}

function javascript(){
    return src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(rename({suffix: '.min'})) //El suffix es el sufijo que queremos
        .pipe(dest('./build/js'))
}

function imagenes (){ //Con esto minificamos las imagenes que tengamos en el sitio
    return src(paths.imagenes)
        .pipe(imagemin())
        .pipe(dest('./build/img'))
        .pipe(notify({message: 'Imagen Minificada'}));
}

function versionWebp () {
    return src(paths.imagenes)
        .pipe(webp())
        .pipe(dest('./build/img'))
        .pipe(notify({message: 'Versión webP lista'}));
}

function watchArchivos(){
    // watch('src/scss/app.scss', css); //Le indicamos que archivo debe estar validando por cambios y como segundo parametro le pasamos la funcion css la cual nos indica que segun la creamos pues convertira el sass al css en el archivo app.css
    watch(paths.scss, css); //Con esto le indicamos que haga watch para todos los archivos que esten sobre todas las carpetas con esa extensión
    // * = la carpeta actual || ** = todos los archivos en carpetas con esa extensión
    watch(paths.js, javascript);
}
 
exports.css = css;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;

exports.default = series( css, javascript, imagenes, versionWebp, watchArchivos);