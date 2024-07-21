const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

const URL_IMG = 'https://image.tmdb.org/t/p/w300';

async function getTrendingMoviesPreview() {
  try {
    const { data, status } = await instance.get('/trending/movie/day');
    const movies = data.results;
    movies.forEach((movie) => {
      const trendingPreviewMovieList = document.getElementsByClassName(
        'trendingPreview-movieList'
      )[0];
      let view = `
      <div class="movie-container">
        <img
          src="${URL_IMG}${movie.poster_path}"
          alt="${movie.title}" class="movie-img">
      </div>
      `;
      trendingPreviewMovieList.innerHTML += view;
    });
  } catch (error) {
    alert(error);
    console.log(error);
  }
}

async function getCategoriesPreview() {
  try {
    const { data, status } = await instance.get(
      '/genre/movie/list?language=es'
    );
    const categories = data.genres;
    categories.forEach((category) => {
      const categoriesPreviewList = document.getElementsByClassName(
        'categoriesPreview-list'
      )[0];
      let view = `
      <div class="category-container">
        <h3 id="${category.id}" class="category-title">${category.name}</h3>
      </div>
      `;
      categoriesPreviewList.innerHTML += view;
    });
  } catch (error) {
    alert(error);
    console.log(error);
  }
}

getTrendingMoviesPreview();
getCategoriesPreview();
