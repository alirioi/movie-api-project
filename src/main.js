const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

const URL_IMG = 'https://image.tmdb.org/t/p/w300';

async function getTrendingMoviesPreview() {
  try {
    const { data } = await instance('/trending/movie/day');
    const movies = data.results;
    trendingMoviesPreviewList.innerHTML = '';

    movies.forEach((movie) => {
      const movieContainer = document.createElement('div');
      movieContainer.classList.add('movie-container');

      const movieImage = document.createElement('img');
      movieImage.classList.add('movie-img');
      movieImage.src = `${URL_IMG}${movie.poster_path}`;
      movieImage.alt = movie.title;

      movieContainer.appendChild(movieImage);
      trendingMoviesPreviewList.appendChild(movieContainer);
    });
  } catch (error) {
    alert(error);
    console.log(error);
  }
}

async function getCategoriesPreview() {
  try {
    const { data } = await instance('/genre/movie/list?language=es');
    const categories = data.genres;
    categoriesPreviewList.innerHTML = '';

    categories.forEach((category) => {
      const categoryContainer = document.createElement('div');
      categoryContainer.classList.add('category-container');

      const categoryTitle = document.createElement('h3');
      categoryTitle.classList.add('category-title');
      categoryTitle.id = category.id;

      const categoryTitleText = document.createTextNode(category.name);
      categoryTitle.appendChild(categoryTitleText);
      categoryContainer.appendChild(categoryTitle);
      categoriesPreviewList.appendChild(categoryContainer);
    });
  } catch (error) {
    alert(error);
    console.log(error);
  }
}
