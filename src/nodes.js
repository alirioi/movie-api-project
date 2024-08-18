const $ = (id) => document.querySelector(id);

//* URLs
const URL_BASE = 'https://api.themoviedb.org/3/';
const URL_TRENDING = '/trending/movie/day';
const URL_CATEGORIES_PREVIEW = '/genre/movie/list';
const URL_CATEGORY = (id) => `/discover/movie?with_genres=${id}`;
const URL_SEARCH = (query) => `/search/movie?query=${query}`;
const URL_MOVIE = (id) => `/movie/${id}`;
const URL_RELATED_MOVIES = (id) => `/movie/${id}/similar`;
const URL_IMG = 'https://image.tmdb.org/t/p/w300';
const URL_IMG_BACKGROUND = 'https://image.tmdb.org/t/p/w1280/';

//* Sections
const headerSection = $('#header');
const trendingPreviewSection = $('#trendingPreview');
const categoriesPreviewSection = $('#categoriesPreview');
const likedSection = $('#liked');
const genericSection = $('#genericList');
const movieDetailSection = $('#movieDetail');
const movieDetailSectionHeader = $('#movieDetail .movieDetail-header');
const footerSection = $('footer');

//* List & Containers
const searchForm = $('#searchForm');
const trendingMoviesPreviewList = $('.trendingPreview-movieList');
const categoriesPreviewList = $('.categoriesPreview-list');
const likedMoviesListContainer = $('.liked-movieList');
const movieDetailCategoriesList = $('#movieDetail .categories-list');
const relatedMoviesContainer = $('.relatedMovies-scrollContainer');
const movieDetailTitleContainer = $('.movieDetailTitle-container');
const movieDetailBtnContainer = $('.movieDetailBtn-container');

//* Elements
const headerTitle = $('.header-title');
const headerBackground = $('.header-background');
const headerBackgroundImg = $('.header-background-img');
const arrowBtn = $('.header-arrow');
const headerCategoryTitle = $('.header-title--categoryView');
const searchFormInput = $('#searchForm input');
const searchFormBtn = $('#searchBtn');
const trendingBtn = $('.trendingPreview-button');
const movieDetailTitle = $('.movieDetail-title');
const movieDetailDescription = $('.movieDetail-description');
const movieDetailScore = $('.movieDetail-score');
// const languageSelect = $('#language');
