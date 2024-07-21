const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

const URL_IMG = 'https://image.tmdb.org/t/p/w300';

async function getTrendingMoviesPreview() {
  try {
    const response = await instance.get('/trending/movie/day');
    const movies = response.data.results;
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
    console.log(error);
  }
}

getTrendingMoviesPreview();

{
  /* <div class="movie-container">
            <img
            src="https://image.tmdb.org/t/p/w300/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg"
            alt="movie-1" class="movie-img" alt=""Nombre de la película">
          </div> */
}
