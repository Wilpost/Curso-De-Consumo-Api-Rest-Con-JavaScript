// Data

  const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      "api_key": API_KEY,
      "language": localStorage.setItem("Lenguage", languageSelect.value),
    },
});

function camb(){
  const sel1 = document.querySelector(".sel");
  const valueLS = sel1.value=sel1.options[sel1.selectedIndex].value;
  localStorage.setItem("Lenguage", valueLS);
  window.addEventListener()
  console.log(valueLS);
}

function likedMovieList(){
    const item = JSON.parse(localStorage.getItem("llave"));
    let movies;

    if (item) {
     movies = item;
    }else{
      movies = {};
    }

    return movies;
}

function likeMovie(movie){

    const likeMovies = likedMovieList();
    
    if(likeMovies[movie.id]){
      likeMovies[movie.id] = undefined;
    }else{
      likeMovies[movie.id] = movie;
    }
    localStorage.setItem("llave", JSON.stringify(likeMovies));
}

function view(){
      if(localStorage.getItem("llave") == "{}"){
        // //Message: No hay ninguna pelicula seleccionada
        const divNuevo = document.createElement("div");
        divNuevo.classList.add("message");
        const elementH2 = document.createElement("h2");
        elementH2.classList.add("text-empty-ls");
        elementH2.innerText = localStorage.getItem("message");
  
        divNuevo.appendChild(elementH2);
        likedMoviesArticle.appendChild(divNuevo);

      }
}

// Helper

  const movieObserver = new IntersectionObserver((entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
    const url = entry.target.getAttribute("data-img");
    const urlTitle = entry.target.getAttribute("data-title");
    entry.target.setAttribute("src", url);
    entry.target.setAttribute("alt", urlTitle);
}
});
  
}));
    
  function createMovies(movie, container, clean = false) {
    
    if(clean){
      container.innerHTML = "";
    }
    
    movie.forEach(movie => {
      const trendinContainerMovies = document.createElement("div");
      trendinContainerMovies.classList.add("movie-container");

      const imgMovie = document.createElement("img");
      const btnFav = document.createElement("button");
      if(likedMovieList()[movie.id]) {
        btnFav.classList.toggle("btn-movie--addFav");
      }
      btnFav.classList.add("btn-movie--liked");
      imgMovie.classList.add("movie-img");
      imgMovie.classList.add("movie-img--loading");
      imgMovie.setAttribute("data-title", movie.title);
      imgMovie.setAttribute("data-img", "https://image.tmdb.org/t/p/w300/" +
      movie.poster_path);
      if(movie.poster_path === null){
        imgMovie.setAttribute("src", "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg");
      }
      
      imgMovie.addEventListener("click", () => {
        location.hash = "#movie=" + movie.id;
      })

      btnFav.addEventListener("click", () =>{
          btnFav.classList.toggle("btn-movie--addFav");
          likeMovie(movie);
          window.addEventListener("storage", getLikedMovies());
          window.addEventListener("storage", view());
      });
      
      movieObserver.observe(imgMovie);
        
      trendinContainerMovies.appendChild(btnFav); 
      trendinContainerMovies.appendChild(imgMovie);
      container.appendChild(trendinContainerMovies);
  })
}
  
  function createCategories(category, container) {
    container.innerHTML = '';
  
    category.forEach(categorie => {
      const categorieContainerMovies = document.createElement("div");
      categorieContainerMovies.classList.add("category-container");
  
      const categoryTitle = document.createElement("h3");
      const textTitleCategorie = document.createTextNode(categorie.name);
      categoryTitle.classList.add("category-title");
      categoryTitle.addEventListener('click', () => {
        location.hash = '#category=' + categorie.id + "-" +
          categorie.name;
      });
  
      categoryTitle.setAttribute("id", 'id' + categorie.id);
  
      categoryTitle.appendChild(textTitleCategorie);
      categorieContainerMovies.appendChild(categoryTitle);
      container.appendChild(categorieContainerMovies);
    });
  }
  
// Request to API
  
  async function getTrendingMovie() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;

    
    createMovies(movies, trendingMoviesPreviewList, true);
  }

  function callback(){
    if (location.hash.startsWith("#trends")) {
      scrollAll(null, null, 'trending/movie/day');
    } else if (location.hash.startsWith("#category=")) {
      scrollAll(parameterId, null, "discover/movie");
    } else if (location.hash.startsWith("#search=")) {
      scrollAll(null, parameter, "search/movie"); 
    }
  }

  async function scrollAll(id, query, urlApi){
    const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
    const scrollIsTrue = (scrollTop + clientHeight) >= (scrollHeight - 15);

    const { data } = await api(urlApi, {
      params:{
      "page": pages,
       with_genres: id,
       query: query,
      }
     });
     
    const maxPages = data.total_pages;
    const pagesIsNotMax = pages < maxPages;

    if (scrollIsTrue && pagesIsNotMax) {
      pages++;
      
    const movies = data.results;

    createMovies(movies, genericSection, true);
    }
  }
  
  async function getTrendingMoviePreview(){
    const { data } = await api('trending/movie/day');
    const movies = data.results;
  
    createMovies(movies, genericSection, true);
  }
  
  async function getCategoriesMoviesPreview() {
    const { data } = await api('genre/movie/list');
    const categories = data.genres;
  
    createCategories(categories, categoriesPreviewList);  
  }
  
  async function getMoviesByCategory(id) {
    const { data } = await api("discover/movie", {
      params: {
        with_genres: id,
      }
    });
    const movies = data.results;
  
    createMovies(movies, genericSection, true)
  }
  
  async function getMoviesBySearch(query) {

    const { data } = await api("search/movie", {
      params: {
        query,
        "page": pages,
      }
    });
  
    const movies = data.results;
  
    createMovies(movies, genericSection, true)
  }
  
  async function getTrendingMovieById(id) {
    const { data: movie } = await api('movie/' + id);
    const urlPosterPath = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path;
  
    headerSection.style.background = `
    linear-gradient(180deg,rgba(0,0,0,0.35) 19.27%,rgba(0,0,0,0) 29.17%),
    url(${urlPosterPath})
    `;
  
    movieDetailTitle.innerText = movie.title;
    movieDetailDescription.innerText = movie.overview;
    movieDetailScore.innerText = movie.vote_count;
  
    createCategories(movie.genres, movieDetailCategoriesList, true);
  
    getRelatedMovieById(id);
  }

  async function getRelatedMovieById(id) {
    const { data } = await api(`movie/${id}/similar`);
    const relatedData = data.results;
  
    createMovies(relatedData, relatedMoviesContainer, true);
  }

  function getLikedMovies(){
    const moviesLiked = likedMovieList();
    const moviesArray = Object.values(moviesLiked);

    createMovies(moviesArray, likedMoviesArticle, true);
  }