// search.js
document.addEventListener('DOMContentLoaded', () => {
    // Configuración de las páginas a buscar con sus rutas relativas
    const categories = [
        { path: 'categorias/Terror/terror.html', name: 'TERROR' },
        { path: 'categorias/Romance/romance.html', name: 'ROMANCE' },
        { path: 'categorias/Suspenso/Suspenso.html', name: 'SUSPENSO' },
        { path: 'categorias/Drama/Drama.html', name: 'DRAMA' },
        { path: 'categorias/Accion/Accion.html', name: 'ACCION' },
        { path: 'categorias/Animadas/Animada.html', name: 'ANIMADAS' },
        { path: 'categorias/Ciencia Ficcion/ficcion.html', name: 'CIENCIA FICCION' },
        { path: 'categorias/Aventura/Aventura.html', name: 'AVENTURA' },
        { path: 'categorias/Comedia/Comedia.html', name: 'COMEDIA' }
    ];

    let moviesDatabase = [];

    // Crear contenedor de resultados
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-box';
    const searchResults = document.createElement('div');
    searchResults.className = 'search-results';
    searchContainer.appendChild(searchResults);
    document.querySelector('.header').appendChild(searchContainer);

    // Cargar y procesar las páginas
    async function loadMoviesDatabase() {
        for (const category of categories) {
            try {
                const response = await fetch(category.path);
                const text = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, 'text/html');

                // Extraer información de las películas
                const movieCards = doc.querySelectorAll('.movie-card');
                movieCards.forEach(card => {
                    const videoSrc = card.querySelector('video')?.getAttribute('src') || '';
                    moviesDatabase.push({
                        title: card.querySelector('.movie-title')?.textContent || '',
                        rating: card.querySelector('.movie-info p:first-of-type')?.textContent || '',
                        description: card.querySelector('.movie-info p:last-of-type')?.textContent || '',
                        category: category.name,
                        videoPath: `${category.path.split('/').slice(0, -1).join('/')}/${videoSrc}`,
                        path: category.path
                    });
                });
            } catch (error) {
                console.error(`Error loading ${category.path}:`, error);
            }
        }
    }

    // Función de búsqueda mejorada
    function filterMovies() {
        const searchTerm = document.getElementById('filter-input').value.toLowerCase().trim();
        searchResults.innerHTML = '';

        if (searchTerm.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        const matches = moviesDatabase.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm) ||
            movie.description.toLowerCase().includes(searchTerm)
        );

        if (matches.length > 0) {
            searchResults.style.display = 'block';
            matches.slice(0, 5).forEach(movie => { // Limitamos a 5 resultados para mejor UX
                const resultCard = document.createElement('div');
                resultCard.className = 'search-result-card';
                resultCard.innerHTML = `
                    <div class="result-content">
                        <div class="result-info">
                            <h3>${movie.title}</h3>
                            <span class="result-category">${movie.category}</span>
                            <div class="result-rating">${movie.rating}</div>
                            <p>${movie.description}</p>
                        </div>
                    </div>
                `;

                // Agregar evento de clic para navegar a la página de la categoría
                resultCard.addEventListener('click', () => {
                    window.location.href = movie.path;
                });

                searchResults.appendChild(resultCard);
            });

            if (matches.length > 5) {
                const moreResults = document.createElement('div');
                moreResults.className = 'more-results';
                moreResults.textContent = `Y ${matches.length - 5} resultados más...`;
                searchResults.appendChild(moreResults);
            }
        } else {
            searchResults.style.display = 'block';
            searchResults.innerHTML = '<div class="no-results">No se encontraron películas que coincidan con tu búsqueda</div>';
        }
    }

    // Cerrar resultados al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-box') && !e.target.closest('.search-results')) {
            searchResults.style.display = 'none';
        }
    });

    // Inicializar
    loadMoviesDatabase();

    // Reemplazar la función filterMovies existente y actualizar el evento
    window.filterMovies = filterMovies;
    const searchInput = document.getElementById('filter-input');
    searchInput.removeAttribute('onkeyup');
    searchInput.addEventListener('input', filterMovies);
});