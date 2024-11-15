 // Esperar a que el documento esté listo
 document.addEventListener("DOMContentLoaded", function() {
    // Obtener el input de búsqueda
    const searchInput = document.getElementById("search-input");
    // Obtener todas las tarjetas de película
    const movieCards = document.querySelectorAll(".movie-card");

    // Escuchar el evento de entrada en el campo de búsqueda
    searchInput.addEventListener("input", function() {
        const searchTerm = searchInput.value.toLowerCase(); // Convertir a minúsculas para la comparación

        // Iterar a través de las tarjetas de película
        movieCards.forEach(function(card) {
            const title = card.querySelector(".movie-title").textContent.toLowerCase(); // Obtener el título en minúsculas

            // Verificar si el título incluye el término de búsqueda
            if (title.includes(searchTerm)) {
                card.style.display = ""; // Mostrar tarjeta si coincide
            } else {
                card.style.display = "none"; // Ocultar tarjeta si no coincide
            }
        });
    });
});