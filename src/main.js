// Data
let language = 'es-MX';

const instance = axios.create({
  baseURL: URL_BASE,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
  params: {
    page: 1,
  },
});

function likedMoviesList() {
  const item = JSON.parse(localStorage.getItem('liked_movies'));
  let movies;

  if (item) {
    movies = item;
  } else {
    movies = {};
  }

  return movies;
}

function likeMovie(movie) {
  const likedMovies = likedMoviesList();
  console.log(likedMovies);

  if (likedMovies[movie.id]) {
    likedMovies[movie.id] = undefined;
  } else {
    likedMovies[movie.id] = movie;
  }

  localStorage.setItem('liked_movies', JSON.stringify(likedMovies));
  getLikedMovies();
  getTrendingMoviesPreview();
}

// Utils
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

    const movieImage = document.createElement('img');
    movieImage.classList.add('movie-img');
    movieImage.src = 'https://placehold.co/150x260/060606/060606';
    movieImage.alt = movie.title;
    movieImage.setAttribute('data-img', `${URL_IMG}${movie.poster_path}`);

    movieImage.addEventListener('click', () => {
      location.hash = `#movie=${movie.id}-${movie.title}`;
      skeletonLoaderCategories(movieDetailCategoriesList);
    });

    movieImage.addEventListener('error', () => {
      movieImage.setAttribute(
        'src',
        `https://placehold.co/150x225/292927/292927`
      );
      const movieTitle = document.createElement('span');
      movieTitle.classList.add('movieDefault-title');
      movieTitle.textContent = movie.title;
      movieContainer.appendChild(movieTitle);
    });

    const movieFooter = document.createElement('div');
    movieFooter.classList.add('movie-footer');
    movieContainer.appendChild(movieFooter);

    const movieScore = document.createElement('span');
    movieScore.classList.add('movie-score');
    movieScore.textContent = parseFloat(movie.vote_average).toFixed(1);

    lazyLoader.observe(movieImage);
    movieContainer.appendChild(movieImage);
    buttonLike(movieFooter, movie);
    movieFooter.appendChild(movieScore);
    movieContainer.appendChild(movieFooter);
    container.appendChild(movieContainer);
  });
}

function buttonLike(container, movie) {
  const movieBtn = document.createElement('button');
  movieBtn.classList.add('movie-btn');

  const movieBtnIcon = document.createElement('img');
  movieBtnIcon.classList.add('movie-btn-icon');
  movieBtnIcon.src = './styles/icons/unlike.svg';
  movieBtnIcon.alt = 'like';
  movieBtn.appendChild(movieBtnIcon);

  // si el movie existe en el localStorage pone el icono de like
  if (likedMoviesList()[movie.id]) {
    movieBtnIcon.src = './styles/icons/like.svg';
  }

  movieBtn.addEventListener('click', () => {
    // cambiar el icono
    movieBtnIcon.src = movieBtnIcon.src.endsWith('/like.svg')
      ? './styles/icons/unlike.svg'
      : './styles/icons/like.svg';

    likeMovie(movie);
  });

  container.appendChild(movieBtn);
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
  movieDetailBtnContainer.innerHTML = '';
}

function skeletonLoaderMovieDetailRemove() {
  movieDetailTitle.classList.remove('movieDetail-title--loading');
  movieDetailScore.classList.remove('movieDetail-score--loading');
  movieDetailDescription.classList.remove('movieDetail-description--loading');
}

// Llamadas a la API

async function getTrendingMoviesPreview() {
  try {
    const { data } = await instance(URL_TRENDING, {
      params: {
        language,
      },
    });
    const movies = data.results;

    renderMovies(movies, trendingMoviesPreviewList);
  } catch (error) {
    alert(error);
    console.log(error);
  }
}

async function getCategoriesPreview() {
  try {
    const { data } = await instance(URL_CATEGORIES_PREVIEW, {
      params: {
        language,
      },
    });
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

    const { data } = await instance(URL_CATEGORY(id), {
      params: {
        language,
      },
    });

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

    const { data } = await instance(URL_SEARCH(query), {
      params: {
        language,
      },
    });

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

    const { data } = await instance(URL_TRENDING, {
      params: {
        language,
      },
    });

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
          language,
          page,
        },
      });

      const movies = data.results;
      renderMovies(movies, genericSection, page === 1);
    } else if (page === maxPage && !isMaxPageReached) {
      isMaxPageReached = true;

      if (!$('.max-page-reached')) {
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
    const { data: movie } = await instance(URL_MOVIE(id), {
      params: {
        language,
      },
    });
    if (movie.poster_path === null) {
      movie.poster_path = 'https://placehold.co/150x225/292927/292927';
    } else {
      movie.poster_path = `${URL_IMG_BACKGROUND}${movie.poster_path}`;
    }
    headerBackgroundImg.src = movie.poster_path;
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

    if (movieDetailSectionHeader.querySelector('.movie-btn') === null) {
      buttonLike(movieDetailBtnContainer, movie);
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
    const { data: movies } = await instance(URL_RELATED_MOVIES(id), {
      params: {
        language,
      },
    });

    renderMovies(movies.results, relatedMoviesContainer);
  } catch (error) {
    alert(error);
    console.log(error);
  }
}

function getLikedMovies() {
  const likedMovies = likedMoviesList();

  const moviesArray = Object.values(likedMovies);

  if (moviesArray.length === 0) {
    likedMoviesListContainer.innerHTML = '';
    const noMoviesLiked = document.createElement('span');
    noMoviesLiked.classList.add('no-movies-liked');
    noMoviesLiked.textContent = 'No has guardado ninguna película.';
    likedMoviesListContainer.appendChild(noMoviesLiked);
  } else {
    renderMovies(moviesArray, likedMoviesListContainer);
  }
}
