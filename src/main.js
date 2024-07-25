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

//Utils

function renderMovies(movies, container) {
  container.innerHTML = '';
  movies.forEach((movie) => {
    if (movie.poster_path !== null && movie.poster_path !== undefined) {
      const movieContainer = document.createElement('div');
      movieContainer.classList.add('movie-container');

      const movieImage = document.createElement('img');
      movieImage.classList.add('movie-img');
      movieImage.src = `${URL_IMG}${movie.poster_path}`;
      movieImage.alt = movie.title;

      movieContainer.appendChild(movieImage);
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
        query: query.toLowerCase(),
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
