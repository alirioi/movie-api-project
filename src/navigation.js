searchFormBtn.addEventListener('click', (e) => {
  if (searchFormInput.value.length > 0) {
    location.hash = '#search=' + searchFormInput.value;
  }
  e.preventDefault();
});

trendingBtn.addEventListener('click', () => (location.hash = '#trends'));

arrowBtn.addEventListener('click', () => (location.hash = '#home'));

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
  headerSection.style.background = '';
  arrowBtn.classList.add('inactive');
  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.remove('inactive');
  categoriesPreviewSection.classList.remove('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');

  trendingMoviesPreviewList.scrollLeft = 0;
  categoriesPreviewList.scrollLeft = 0;
  getTrendingMoviesPreview();
  getCategoriesPreview();
}

function trendsPage() {
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');
}

function searchPage() {
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  const query = decodeURI(location.hash.split('=')[1]);
  headerCategoryTitle.innerHTML = `Buscaste: "${query}"`;
  getMovieBySearch(query);
}

function movieDetailsPage() {
  headerSection.classList.add('header-container--long');
  // headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.remove('inactive');
}

function categoriesPage() {
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  const [_, categoryData] = location.hash.split('=');
  const [categoryId, categoryName] = categoryData.split('-');

  getMoviesByCategory(categoryId);
}
