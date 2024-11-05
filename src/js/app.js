document.addEventListener('DOMContentLoaded', function(){
    scrollNav();

    navegacionFija();
});

function navegacionFija(){

    const barra = document.querySelector('.header'); //Seleccionamos el header que es el que tiene la barra
    //Registrar el IntersectionOberver
    const observer = new IntersectionObserver(function(entries){ //El intersectionobserver es una API de JS para validar que objetos se ven en la pantalla y que no al dar scroll
        if(entries[0].isIntersecting){ //El isIntersecting es un atributo de la API la cual estara viendo en este caso si .sobre-festival es visible en pantalla o no
            barra.classList.remove('fijo'); //Si esta visible le quitamos la clase
        } else{
            barra.classList.add('fijo'); //si no esta visible le agregamos la clase
        }
    });

    //Elemento a Obervar
    observer.observe(document.querySelector('.sobre-festival'));
}

function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a'); //Con esto apuntamos a los encales.

    enlaces.forEach(function(enlace){ //Ya que enlaces tiene un listado de cosas en con foreach la iteramos cada una de estas
        enlace.addEventListener('click', function(e){
            e.preventDefault(); //Con esto prevenimos la accion por defecto de los Id que creamos
            const seccion = document.querySelector(e.target.attributes.href.value); //Con esto creamos una variable que sacara el valor del atributo href de cada enlace

            seccion.scrollIntoView({ //Esto es un atributo que permite hacer el salto de linea igual que el Id en el HTMl
                behavior: 'smooth' //Este valor a diferencia del automatico hara ese scroll mas despacio
            });
        
        })
    });

    
}
