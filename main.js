const OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTZkYWNiYjJjNzg3NTUxNTM2ZjA3Y2ZjNTQ2ZWJhMSIsInN1YiI6IjVjNmYxZDdhYzNhMzY4M2JmMGU1NWQxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9PFQDM87uMDX7PfJB1p_cJGoov8pTNBXhNi8lxzASrg',
  },
};
const API_URL = 'https://api.themoviedb.org/3/discover/movie';
const IMG_URL = 'https://image.tmdb.org/t/p/w1280/';

const main = document.getElementById('main');
const search = document.getElementById('search');
const form = document.getElementById('form');

getMovies(API_URL);
async function getMovies(url) {
  const response = await fetch(url, OPTIONS);
  const data = await response.json();
  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = '';
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
        <img src="${IMG_URL + poster_path}" alt="${title}" />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
          <div class="overview">
            <h3>Overview</h3>
            ${overview}
          </div>
        </div>
    `;
    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

form.addEventListener('submit', (e) => {
  const searchTerm = search.value;
  const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=3a6dacbb2c787551536f07cfc546eba1`;
  e.preventDefault();

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_URL);
  }
});
