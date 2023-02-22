const $ = (id) => document.querySelector(id);

// Sections
const headerSection = $('#header');
const trendingPreviewSection = $('#trendingPreview');
const categoriesPreviewSection = $('#categoriesPreview');
const genericSection = $('#genericList');
const movieDetailSection = $('#movieDetail');
const moveiContainer = $(".movie-container");
const likedMoviesSection = $("#liked");
const languageSelect = $(".sel");

// Lists & Containers
const searchForm = $('#searchForm');
const trendingMoviesPreviewList = $('.trendingPreview-movieList');
const categoriesPreviewList = $('.categoriesPreview-list');
const movieDetailCategoriesList = $('#movieDetail .categories-list');
const relatedMoviesContainer = $('.relatedMovies-scrollContainer');
const movieContainerTwo = $(".movie-container--liked");
const likedMoviesArticle = $('.liked-movies_list');

// Elements
const headerTitle = $('.header-title');
const arrowBtn = $('.header-arrow');
const headerCategoryTitle = $('.header-title--categoryView');

const searchFormInput = $('#searchForm input');
const searchFormBtn = $('#searchBtn');

const trendingBtn = $('.trendingPreview-btn');
const imgPreviewLoading1 = $(".preview1");
const imgPreviewLoading2 = $(".preview2");
const imgPreviewLoading3 = $(".preview3");
const imgPreviewLoading4 = $(".preview4");

const movieDetailTitle = $('.movieDetail-title');
const movieDetailDescription = $('.movieDetail-description');
const movieDetailScore = $('movieDetail-score');