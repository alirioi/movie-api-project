const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
  params: {
    language: 'es-MX',
  },
});

const URL_IMG = 'https://image.tmdb.org/t/p/w300';
const URL_IMG_BACKGROUND = 'https://image.tmdb.org/t/p/w1280/';

//Utils

function renderMovies(movies, container) {
  container.innerHTML = '';
  movies.forEach((movie) => {
    if (movie.poster_path !== null && movie.poster_path !== undefined) {
      const movieContainer = document.createElement('div');
      movieContainer.classList.add('movie-container');
      movieContainer.addEventListener('click', () => {
        location.hash = `#movie=${movie.id}-${movie.title}`;
      });

      const movieImage = document.createElement('img');
      movieImage.classList.add('movie-img');
      movieImage.src = `${URL_IMG}${movie.poster_path}`;
      movieImage.alt = movie.title;

      const movieScore = document.createElement('div');
      movieScore.classList.add('movie-score');
      movieScore.textContent = parseFloat(movie.vote_average).toFixed(1);

      movieContainer.appendChild(movieImage);
      movieContainer.appendChild(movieScore);
      container.appendChild(movieContainer);
    }
  });
}

function renderCategories(categories, container) {
  container.innerHTML = '';

  categories.forEach((category) => {
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.id = category.id;
    categoryContainer.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`;
      headerCategoryTitle.innerHTML = category.name;
    });

    const categoryTitleText = document.createTextNode(category.name);
    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}

// Llamadas a la API

async function getTrendingMoviesPreview() {
  try {
    const { data } = await instance('/trending/movie/day');
    const movies = data.results;

    renderMovies(movies, trendingMoviesPreviewList);
  } catch (error) {
    alert(error);
    console.log(error);
  }
}

async function getCategoriesPreview() {
  try {
    const { data } = await instance('/genre/movie/list');
    const categories = data.genres;

    renderCategories(categories, categoriesPreviewList);
  } catch (error) {
    alert(error);
    console.log(error);
  }
}

async function getMoviesByCategory(id) {
  try {
    const { data } = await instance('/discover/movie', {
      params: {
        with_genres: id,
      },
    });
    const movies = data.results;

    renderMovies(movies, genericSection);
  } catch (error) {
    alert(error);
    console.log(error);
  }
}

async function getMovieBySearch(query) {
  try {
    const { data } = await instance('/search/movie', {
      params: {
        query,
      },
    });
    const movies = data.results;
    if (movies.length === 0) {
      genericSection.innerHTML = `<h2>No se encontraron resultados para la búsqueda</h2>`;
    } else {
      renderMovies(movies, genericSection);
    }
  } catch (error) {
    alert(error);
    console.log(error);
  }
}

async function getTrendingMovies() {
  try {
    let movies = [];
    for (let i = 1; i <= 3; i++) {
      const { data } = await instance('/trending/movie/day', {
        params: {
          page: i,
        },
      });
      movies = movies.concat(data.results);
    }

    renderMovies(movies, genericSection);
  } catch (error) {
    alert(error);
    console.log(error);
  }
}

async function getMovieById(id) {
  try {
    const { data: movie } = await instance(`/movie/${id}`);

    headerBackgroundImg.src = `${URL_IMG_BACKGROUND}${movie.poster_path}`;
    headerBackgroundImg.alt = movie.title;
    if (
      movie.release_date !== null &&
      movie.release_date !== undefined &&
      movie.release_date !== ''
    ) {
      movieDetailTitle.textContent = `${movie.title} (${
        movie.release_date.split('-')[0]
      })`;
    } else {
      movieDetailTitle.textContent = movie.title;
    }

    movieDetailScore.textContent = parseFloat(movie.vote_average).toFixed(1);

    if (
      movie.overview !== null &&
      movie.overview !== undefined &&
      movie.overview !== ''
    ) {
      movieDetailDescription.textContent = movie.overview;
    } else {
      movieDetailDescription.textContent = 'No hay descripción disponible';
    }

    renderCategories(movie.genres, movieDetailCategoriesList);
    getRelatedMoviesId(id);
  } catch (error) {
    alert(error);
    console.log(error);
  }
}

async function getRelatedMoviesId(id) {
  try {
    const { data: movies } = await instance(`/movie/${id}/similar`);

    renderMovies(movies.results, relatedMoviesContainer);
  } catch (error) {
    alert(error);
    console.log(error);
  }
}
