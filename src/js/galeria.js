document.addEventListener('DOMContentLoaded', function(){
    crearGaleria();
});

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes'); //Seleccionamos la clase del HTML

    for(let i = 1; i <= 12; i++){ //Aqui comienza desde 1 hasta 12 porque son las imagenes que tenemos
        const imagen = document.createElement('IMG'); //creamos un elemento img de html
        imagen.src = `build/img/thumb/${i}.webp`; //agregamos el src a ese img antes creado
        imagen.classList.add('pointer');
        imagen.dataset.imagenId = i;
        //Aqui añadimos la función de mostrarImagen en grande
        imagen.onclick = mostrarImagen;
        const lista = document.createElement('LI');//Creamos un li para agregar esa imagen a ese li
        lista.appendChild(imagen); //Cogemos ese li y le agregamos la imagen
        galeria.appendChild(lista);
    }
}

function mostrarImagen(e){
    const id = parseInt(e.target.dataset.imagenId); //Aqui obtenemos el numero de la imagen por el dataset que creamos arriba
    const imagen = document.createElement('IMG');
    imagen.src = `build/img/grande/${id}.webp`;
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen); //Creamos un div y le agregamos la imagen grande del paso anterior
    overlay.classList.add('overlay');
    //Cuando damos clic que no sea la X para poder cerrarlo
    overlay.onclick = function(){
        overlay.remove();
        body.classList.remove('fijar-body');
    }
    //Boton para cerrar imagen
    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');
    //Cuando se presiona la X cierra la imagen
    cerrarImagen.onclick = function(){
        overlay.remove();
        body.classList.remove('fijar-body');
    }
    overlay.appendChild(cerrarImagen);
    //Mostrar en el HTML
    const body = document.querySelector('body');
    body.appendChild(overlay); //seleccionamos el body y le agregamos la imagen que ya tiene el overlay
    body.classList.add('fijar-body');
}