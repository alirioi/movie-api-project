const instance = axios.create({
  baseURL: URL_BASE,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
  params: {
    language: 'es-MX',
    page: 1,
  },
});

//Utils
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
};

const lazyLoader = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const url = entry.target.getAttribute('data-img');
      entry.target.classList.add('fade-in');
      entry.target.setAttribute('src', url);
      observer.unobserve(entry.target);
    }
  });
}, options);

function renderMovies(movies, container, clean = true) {
  if (clean) {
    container.innerHTML = '';
  }

  movies.forEach((movie) => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    movieContainer.addEventListener('click', () => {
      location.hash = `#movie=${movie.id}-${movie.title}`;
      skeletonLoaderMovies(container);
      skeletonLoaderCategories(movieDetailCategoriesList);
    });

    const movieImage = document.createElement('img');
    movieImage.classList.add('movie-img');
    movieImage.src = 'https://placehold.co/150x225/060606/060606';
    movieImage.alt = movie.title;
    movieImage.setAttribute('data-img', `${URL_IMG}${movie.poster_path}`);

    movieImage.addEventListener('error', () => {
      movieImage.setAttribute(
        'src',
        `https://placehold.co/150x225/292927/292927`
      );
      const movieTitle = document.createElement('span');
      movieTitle.classList.add('movie-title');
      movieTitle.textContent = movie.title;
      movieContainer.appendChild(movieTitle);
    });

    const movieScore = document.createElement('div');
    movieScore.classList.add('movie-score');
    movieScore.textContent = parseFloat(movie.vote_average).toFixed(1);

    lazyLoader.observe(movieImage);

    movieContainer.appendChild(movieImage);
    movieContainer.appendChild(movieScore);
    container.appendChild(movieContainer);
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

function skeletonLoaderMovies(container) {
  container.innerHTML = '';
  for (let i = 0; i <= 5; i++) {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    movieContainer.classList.add('movie-container--loading');
    container.appendChild(movieContainer);
  }
}

function skeletonLoaderCategories(container) {
  container.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');
    categoryContainer.classList.add('category-container--loading');
    container.appendChild(categoryContainer);
  }
}

function skeletonLoaderMovieDetail() {
  movieDetailTitle.classList.add('movieDetail-title--loading');
  movieDetailScore.classList.add('movieDetail-score--loading');
  movieDetailDescription.classList.add('movieDetail-description--loading');
  headerBackgroundImg.src = '';
  headerBackgroundImg.alt = '';
  movieDetailTitle.textContent = 'Title';
  movieDetailDescription.textContent =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  movieDetailScore.textContent = '';
}

function skeletonLoaderMovieDetailRemove() {
  movieDetailTitle.classList.remove('movieDetail-title--loading');
  movieDetailScore.classList.remove('movieDetail-score--loading');
  movieDetailDescription.classList.remove('movieDetail-description--loading');
}

// Llamadas a la API

async function getTrendingMoviesPreview() {
  try {
    const { data } = await instance(URL_TRENDING);
    const movies = data.results;

    renderMovies(movies, trendingMoviesPreviewList);
  } catch (error) {
    alert(error);
    console.log(error);
  }
}

async function getCategoriesPreview() {
  try {
    const { data } = await instance(URL_CATEGORIES_PREVIEW);
    const categories = data.genres;

    renderCategories(categories, categoriesPreviewList);
  } catch (error) {
    alert(error);
    console.log(error);
  }
}

async function getMoviesByCategory(id) {
  try {
    if (page === 1) {
      skeletonLoaderMovies(genericSection);
    }

    const { data } = await instance(URL_CATEGORY(id));

    const movies = data.results;
    maxPage = data.total_pages;

    renderMovies(movies, genericSection, page === 1);
  } catch (error) {
    alert(error);
    console.log(error);
  }
}

async function getMovieBySearch(query) {
  try {
    if (page === 1) {
      skeletonLoaderMovies(genericSection);
    }

    const { data } = await instance(URL_SEARCH(query));

    const movies = data.results;
    maxPage = data.total_pages;
    console.log(maxPage);

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
    if (page === 1) {
      skeletonLoaderMovies(genericSection);
    }

    const { data } = await instance(URL_TRENDING);

    const movies = data.results;
    maxPage = data.total_pages;

    renderMovies(movies, genericSection, page === 1);
  } catch (error) {
    alert(error);
    console.log(error);
  }
}

async function getPaginatedMovies(endpoint) {
  try {
    const scrollIsBottom =
      genericSection.scrollTop + genericSection.clientHeight >=
      genericSection.scrollHeight - 15;
    let isMaxPageReached = false;
    if (scrollIsBottom && page < maxPage) {
      page++;
      const { data } = await instance(endpoint, {
        params: {
          page,
        },
      });

      const movies = data.results;
      renderMovies(movies, genericSection, page === 1);
    } else if (page === maxPage && !isMaxPageReached) {
      isMaxPageReached = true;

      if (!document.querySelector('.max-page-reached')) {
        console.log('No más resultados');
        const maxPageReached = document.createElement('h2');
        maxPageReached.textContent = 'No hay más resultados 😟';
        maxPageReached.classList.add('max-page-reached');
        genericSection.appendChild(maxPageReached);
      }
    }
  } catch (error) {
    alert(error);
    console.log(error);
  }
}

async function getMovieById(id) {
  try {
    skeletonLoaderMovieDetail();
    const { data: movie } = await instance(URL_MOVIE(id));
    headerBackgroundImg.src = `${URL_IMG_BACKGROUND}${movie.poster_path}`;
    headerBackgroundImg.alt = movie.title;

    if (
      movie.release_date !== null &&
      movie.release_date !== undefined &&
      movie.release_date !== ''
    ) {
      movieDetailTitle.appendChild(
        document.createTextNode(` (${movie.release_date.split('-')[0]})`)
      );
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
    skeletonLoaderMovieDetailRemove();
    renderCategories(movie.genres, movieDetailCategoriesList);
    getRelatedMoviesId(id);
  } catch (error) {
    alert(error);
    console.log(error);
  }
}

async function getRelatedMoviesId(id) {
  try {
    skeletonLoaderMovies(relatedMoviesContainer);
    const { data: movies } = await instance(URL_RELATED_MOVIES(id));

    renderMovies(movies.results, relatedMoviesContainer);
  } catch (error) {
    alert(error);
    console.log(error);
  }
}
