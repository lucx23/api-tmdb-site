const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2FhZjBjZjdlM2EyMzFlMmY0N2VhMGFiNDhhN2Q5ZSIsIm5iZiI6MTc2MTYxNzQ4Ni43MzMsInN1YiI6IjY5MDAyNjRlNjZlNjcwMjA4ODI3NjZlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T3iN0CMh0JUo1YYQ5fXvaUiT-_td35PemnJBVDvgOnU';

const btnSearch = document.getElementById('btnSearch');
btnSearch.addEventListener('click', () => {
    const movieName = document.getElementById('movieInput').value.trim();
    const responseDiv = document.getElementById('response');
    responseDiv.classList.remove('hidden');
    responseDiv.innerHTML = '';

    // Evita busca vazia
    if (!movieName) {
        responseDiv.innerHTML = `<p class="text-red-500 text-center">Digite o nome de um filme.</p>`;
        return;
    }

    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieName)}&language=pt-BR`;

    fetch(url, {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    })
        .then(response => response.json())
        .then(data => {
            if (!data.results || data.results.length === 0) {
                responseDiv.innerHTML = `<p class="text-red-500 text-center">Nenhum filme encontrado.</p>`;
                return;
            }

            responseDiv.innerHTML = `<h2 class="text-xl font-semibold text-gray-700 text-center mb-2">Resultados para "${movieName}":</h2>`;

            data.results.forEach(movie => {
                const poster = movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : 'https://via.placeholder.com/200x300?text=Sem+Imagem';

                responseDiv.innerHTML += `
                        <div class="flex bg-gray-50 shadow-md rounded-lg overflow-hidden movieCard">
                            <img class="w-32 h-auto object-cover" src="${poster}" alt="${movie.title}">
                            <div class="p-4">
                                <h3 class="text-lg font-semibold text-gray-800">${movie.title}</h3>
                                <p class="text-sm text-gray-500 mb-1">📅 Lançamento: ${movie.release_date || 'Indisponível'}</p>
                                <p class="text-sm text-gray-500 mb-2">⭐ Nota: ${movie.vote_average?.toFixed(1) || 'N/A'} | 🔥 Popularidade: ${movie.popularity?.toFixed(0) || 'N/A'}</p>
                                <p class="text-gray-700 text-sm">${movie.overview || 'Sem descrição disponível.'}</p>
                            </div>
                        </div>
                    `;
            });
        })
        .catch(error => {
            responseDiv.innerHTML = `<p class="text-red-500 text-center">Erro ao buscar: ${error.message}</p>`;
        });
});