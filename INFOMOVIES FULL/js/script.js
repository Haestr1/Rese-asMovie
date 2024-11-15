
/* 
JOSE DANIEL ROMERO PERDOMO
KEVIN JAMID YALANDA BASTO
Harol
*/

const images = ['imagen1.jpg', 'imagen2.jpg', 'imagen3.jpg', 'imagen4.jpg']; // Lista de imágenes
const imageFolder = 'img/imagenes/'; // Ruta actualizada de la carpeta de imágenes
let currentIndex = 0;

function changeImage() {
    const slideshow = document.getElementById('slideshow');
    slideshow.src = `${imageFolder}${images[currentIndex]}`;

    // Actualizar indicadores
    updateIndicators();
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length; // Incrementa el índice y vuelve al inicio si es necesario
    changeImage();
}

function showPreviousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length; // Decrementa el índice y vuelve al final si es necesario
    changeImage();
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Asocia las funciones a los botones de flechas, pasar, volver.
document.querySelector('.right-arrow').addEventListener('click', showNextImage);
document.querySelector('.left-arrow').addEventListener('click', showPreviousImage);

// Muestra la primera imagen al cargar
window.onload = () => {
    changeImage(); // Muestra la primera imagen de inmediato
    setInterval(showNextImage, 10000); // Cambia la imagen automáticamente cada 10 segundos
};

//REPRODUCCION DEL VIDEO AL PUNTERO POSICIONARSE SOBRE LA PELICULA
function submitForm(genre) {
    document.getElementById('genre').value = genre;
    document.getElementById('genresForm').submit();
}

// Control de reproducción de los trailers al hacer hover
const movieCards = document.querySelectorAll('.movie-card');

movieCards.forEach(card => {
    const video = card.querySelector('video');

    card.addEventListener('mouseenter', () => {
        video.play();
    });

    card.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0; // Reinicia el video al principio
    });
});