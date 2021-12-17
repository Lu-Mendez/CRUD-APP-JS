// Variables
const listareviews = document.querySelector('#lista-reviews');
const formulario = document.querySelector('#formulario');
let reviews = [];

// Event Listeners
eventListeners();

function eventListeners() {
     //Cuando se envia el formulario
     formulario.addEventListener('submit', agregarreview);

     // Contenido cargado
     document.addEventListener('DOMContentLoaded', () => {
          reviews = JSON.parse( localStorage.getItem('reviews') ) || []  ;
          console.log(reviews);
          crearHTML();
     });
}

// Añadir review del formulario
function agregarreview(e) {
     e.preventDefault();
     // leer el valor del textarea
     const review = document.querySelector('#review').value;
     
     // validación
     if(review === '') {
          mostrarError('Un mensaje no puede ir vacio');
          return;
     }

     // Crear un objeto review
     const reviewObj = {
          id: Date.now(),
          texto: review
     }

     // Añadirlo a mis reviews
     reviews = [...reviews, reviewObj];
     
     // Una vez agregado, mandamos renderizar nuestro HTML
     crearHTML();

     // Reiniciar el formulario
     formulario.reset();
}

function mostrarError(error) {
     const mensajeEerror = document.createElement('p');
     mensajeEerror.textContent = error;
     mensajeEerror.classList.add('error');

     const contenido = document.querySelector('#contenido');
     contenido.appendChild(mensajeEerror);

     setTimeout(() => {
          mensajeEerror.remove();
     }, 3000);
}

function crearHTML() {
     limpiarHTML();
     
     if(reviews.length > 0 ) {
          reviews.forEach( review =>  {
               // crear boton de eliminar
               const botonBorrar = '<a class="borrar-review" onclick="borrarreview('+review.id+')">X</a>'

               // crear boton de editar
               const botonEditar = '<a class="editar-review" onclick="editar('+review.id+')">Editar</a>'
     
               // Crear elemento y añadirle el contenido a la lista
               const li = document.createElement('li');

               // Añade el texto
               li.innerText = review.texto;

               // añade el botón de borrar al review
               li.innerHTML += botonBorrar;

               // añade el botón de editar al review
               li.innerHTML += botonEditar;

               // añade un atributo único...
               li.id = review.id;

               // añade el review a la lista
               listareviews.appendChild(li);
          });
     }

     sincronizarStorage();
}

// Elimina el review del DOM
function borrarreview(ids) {
     reviews = reviews.filter( review => review.id != ids  );
     crearHTML();
}

// Editar el review en el DOM
function editar(e) {
     const firstValue = document.getElementById(e).firstChild.data;
     const txtbx = document.getElementById('review').value = '' + firstValue;
     borrarreview(e);
}

// Agrega a local storage
function sincronizarStorage() {
     localStorage.setItem('reviews', JSON.stringify(reviews));
}

// Elimina los cursos del carrito en el DOM
function limpiarHTML() {
     while(listareviews.firstChild) {
          listareviews.removeChild(listareviews.firstChild);
     }
}