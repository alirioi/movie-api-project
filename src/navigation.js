let page = 1;
let maxPage;

searchFormBtn.addEventListener('click', (e) => {
  if (searchFormInput.value.length > 0) {
    location.hash = '#search=' + searchFormInput.value;
  }
  e.preventDefault();
});

trendingBtn.addEventListener('click', () => (location.hash = '#trends'));

arrowBtn.addEventListener('click', () => (location.hash = '#home'));

// languageSelect.addEventListener('change', (e) => {
//   language = e.target.value;
//   navigator();
// });

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
  location.hash.startsWith('#trends')
    ? trendsPage()
    : location.hash.startsWith('#search=')
    ? searchPage()
    : location.hash.startsWith('#movie=')
    ? movieDetailsPage()
    : location.hash.startsWith('#category=')
    ? categoriesPage()
    : homePage();

  genericSection.scrollTop = 0;
}

function homePage() {
  headerSection.classList.remove('header-container--long');
  headerBackground.classList.add('inactive');
  headerBackgroundImg.classList.add('inactive');
  // languageSelect.classList.remove('inactive');
  arrowBtn.classList.add('inactive');
  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');
  footerSection.classList.remove('inactive');

  trendingPreviewSection.classList.remove('inactive');
  categoriesPreviewSection.classList.remove('inactive');
  likedSection.classList.remove('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');

  document.scrollingElement.scrollTop = 0;
  trendingMoviesPreviewList.scrollLeft = 0;
  categoriesPreviewList.scrollLeft = 0;
  likedMoviesListContainer.scrollLeft = 0;
  getTrendingMoviesPreview();
  getCategoriesPreview();
  getLikedMovies();
  page = 1;
  maxPage = 0;
}

function trendsPage() {
  headerSection.classList.remove('header-container--long');
  headerBackground.classList.add('inactive');
  headerBackgroundImg.classList.add('inactive');
  // languageSelect.classList.add('inactive');
  arrowBtn.classList.remove('inactive');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');
  footerSection.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  likedSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  headerCategoryTitle.innerHTML = 'Tendencias';
  getTrendingMovies();

  page = 1;
  genericSection.onscroll = () => getPaginatedMovies(URL_TRENDING);
}

function searchPage() {
  headerSection.classList.remove('header-container--long');
  headerBackground.classList.add('inactive');
  headerBackgroundImg.classList.add('inactive');
  // languageSelect.classList.add('inactive');
  arrowBtn.classList.remove('inactive');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.remove('inactive');
  footerSection.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  likedSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  const query = decodeURI(location.hash.split('=')[1]);
  headerCategoryTitle.innerHTML = `Buscaste: "${query}"`;
  page = 1;
  getMovieBySearch(query);
  genericSection.onscroll = () => getPaginatedMovies(URL_SEARCH(query));
}

function movieDetailsPage() {
  headerSection.classList.add('header-container--long');
  headerBackground.classList.remove('inactive');
  headerBackgroundImg.classList.remove('inactive');
  // languageSelect.classList.add('inactive');
  arrowBtn.classList.remove('inactive');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.add('inactive');
  footerSection.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  likedSection.classList.add('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.remove('inactive');

  document.scrollingElement.scrollTop = 0;
  relatedMoviesContainer.scrollLeft = 0;

  const [_, movieData] = location.hash.split('=');
  const [movieId, movieTitle] = movieData.split('-').map(decodeURI);
  page = 1;
  getMovieById(movieId);
  movieDetailTitle.textContent = movieTitle;
}

function categoriesPage() {
  headerSection.classList.remove('header-container--long');
  headerBackground.classList.add('inactive');
  headerBackgroundImg.classList.add('inactive');
  // languageSelect.classList.add('inactive');
  arrowBtn.classList.remove('inactive');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');
  footerSection.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  likedSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  const [_, categoryData] = location.hash.split('=');
  const [categoryId, categoryName] = categoryData.split('-');
  page = 1;
  getMoviesByCategory(categoryId);
  genericSection.onscroll = () => getPaginatedMovies(URL_CATEGORY(categoryId));
}
