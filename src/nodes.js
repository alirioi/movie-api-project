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
const searchFormInput = $('#searchInput');
const searchFormBtn = $('#searchBtn');
const trendingPreviewTitle = $('.trendingPreview-title');
const trendingBtn = $('.trendingPreview-button');
const categoriesPreviewTitle = $('.categoriesPreview-title');
const likedMoviesTitle = $('.liked-title');
const movieDetailTitle = $('.movieDetail-title');
const movieDetailDescription = $('.movieDetail-description');
const movieDetailScore = $('.movieDetail-score');
const languageSelect = $('#language');
const footerText = $('#footer');

//* Language
const languages = [
  {
    langSelect: 'us',
    searchInputPlaceholder: 'Movies, TV shows and more...',
    trendingPreviewTitle: 'Trending Now',
    trendingBtn: 'View more',
    categoriesPreviewTitle: 'Categories',
    likedTitle: 'Favorites movies',
    noMoviesLikedText: "You haven't saved any movies yet.",
    search: 'You searched',
    NoResults: 'No results for the search',
    maxPageReachedText: 'No more results 😟',
    noDescription: 'No description available',
    footer: `<p>
        Developed by
        <span> Alirio Isea &copy; 2024 </span><br />
        Powered by
        <a
          href="https://developer.themoviedb.org/docs/getting-started"
          target="_blank"
          >TMDb API</a
        >
      </p>`,
  },
  {
    langSelect: 'es-MX',
    searchInputPlaceholder: 'Películas, series y más...',
    trendingPreviewTitle: 'Tendencias',
    trendingBtn: 'Ver más',
    categoriesPreviewTitle: 'Categorías',
    likedTitle: 'Películas favoritas',
    noMoviesLikedText: 'No has guardado ninguna película.',
    search: 'Buscaste',
    NoResults: 'No hay resultados para la búsqueda',
    maxPageReachedText: 'No hay más resultados 😟',
    noDescription: 'No hay descripción disponible',
    footer: `<p>
        Desarrollado por
        <span> Alirio Isea &copy; 2024 </span><br />
        Powered by
        <a
          href="https://developer.themoviedb.org/docs/getting-started"
          target="_blank"
          >TMDb API</a
        >
      </p>`,
  },
  {
    langSelect: 'fr',
    searchInputPlaceholder: 'Films, séries et plus...',
    trendingPreviewTitle: 'Tendances',
    trendingBtn: 'Voir plus',
    categoriesPreviewTitle: 'Catégories',
    likedTitle: 'Films favoris',
    noMoviesLikedText: "Vous n'avez pas encore enregistré de films.",
    search: 'Vous avez cherché',
    NoResults: 'Aucun résultat pour la recherche',
    maxPageReachedText: 'Plus de résultats 😟',
    noDescription: 'Aucune description disponible',
    footer: `<p>
        Développé par
        <span> Alirio Isea &copy; 2024 </span><br />
        Powered by
        <a
          href="https://developer.themoviedb.org/docs/getting-started"
          target="_blank"
          >TMDb API</a
        >
      </p>`,
  },
  {
    langSelect: 'pt-BR',
    searchInputPlaceholder: 'Filmes, séries e mais...',
    trendingPreviewTitle: 'Tendências',
    trendingBtn: 'Ver mais',
    categoriesPreviewTitle: 'Categorias',
    likedTitle: 'Filmes favoritos',
    noMoviesLikedText: 'Você ainda não salvou nenhum filme.',
    search: 'Você pesquisou',
    NoResults: 'Nenhum resultado para a pesquisa',
    maxPageReachedText: 'Não há mais resultados 😟',
    noDescription: 'Nenhuma descrição disponível',
    footer: `<p>
        Desenvolvido por
        <span> Alirio Isea &copy; 2024 </span><br />
        Powered by
        <a
          href="https://developer.themoviedb.org/docs/getting-started"
          target="_blank"
          >TMDb API</a
        >
      </p>`,
  },
  {
    langSelect: 'it',
    searchInputPlaceholder: 'Film, serie e altro...',
    trendingPreviewTitle: 'Tendenze',
    trendingBtn: 'Vedi di più',
    categoriesPreviewTitle: 'Categorie',
    likedTitle: 'Film preferiti',
    noMoviesLikedText: 'Non hai ancora salvato nessun film.',
    search: 'Hai cercato',
    NoResults: 'Nessun risultato per la ricerca',
    maxPageReachedText: 'Nessun altro risultato 😟',
    noDescription: 'Nessuna descrizione disponibile',
    footer: `<p>
        Sviluppato da
        <span> Alirio Isea &copy; 2024 </span><br />
        Powered by
        <a
          href="https://developer.themoviedb.org/docs/getting-started"
          target="_blank"
          >TMDb API</a
        >
      </p>`,
  },
  {
    langSelect: 'de',
    searchInputPlaceholder: 'Filme, Serien und mehr...',
    trendingPreviewTitle: 'Trends',
    trendingBtn: 'Mehr anzeigen',
    categoriesPreviewTitle: 'Kategorien',
    likedTitle: 'Lieblings Filme',
    noMoviesLikedText: 'Du hast noch keine Filme gespeichert.',
    search: 'Du hast gesucht',
    NoResults: 'Keine Ergebnisse für die Suche',
    maxPageReachedText: 'Keine weiteren Ergebnisse 😟',
    noDescription: 'Keine Beschreibung verfügbar',
    footer: `<p>
        Entwickelt von
        <span> Alirio Isea &copy; 2024 </span><br />
        Powered by
        <a
          href="https://developer.themoviedb.org/docs/getting-started"
          target="_blank"
          >TMDb API</a
        >
      </p>`,
  },
];

const elementsToTranslate = {
  trendingPreviewTitle: trendingPreviewTitle,
  trendingBtn: trendingBtn,
  categoriesPreviewTitle: categoriesPreviewTitle,
  likedTitle: likedMoviesTitle,
};
