  let maxPages;
  let pages = 2;
  let infiniteScroll;
  let parameter;
  let parameterId;
  
  searchFormBtn.addEventListener("click", () => location.hash = `#search=${searchFormInput.value}`)
  
  arrowBtn.addEventListener("click", () => {
    location.hash = window.history.back();
  });

  window.addEventListener("DOMContentLoaded", navigator, false);
  window.addEventListener("hashchange", navigator, false);  
  
  function navigator() {
    if (location.hash.startsWith("#trends")) {
      trendsPage();
    } else if (location.hash.startsWith("#category=")) {
      categoriesPage();
    } else if (location.hash.startsWith("#search=")) {
      searchMoviePage();  
    } else if (location.hash.startsWith("#movie=")) {
      detailsMoviePage();
    } else if (location.hash.startsWith("#home")) {
      homePage();
    } else {
      homePage();
      console.log("HOME!!");
    }
//     function view(){
//       if(localStorage.getItem("llave") == "{}"){
//         //Message: No hay ninguna pelicula seleccionada
//         const divNuevo = document.createElement("div");
//         divNuevo.classList.add("message");
//         const elementH2 = document.createElement("h2");
//         elementH2.innerText = localStorage.getItem("message");
  
//         divNuevo.appendChild(elementH2);
//         likedMoviesArticle.appendChild(divNuevo);
//       }else if(localStorage.getItem("llave")){
//          document.querySelector(".message").remove();
//       }
// }
    
    window.addEventListener("storage", view());

    window.addEventListener("scroll", infiniteScroll);
  
  }
  
  function trendsPage() {
    searchForm.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    trendingMoviesPreviewList.classList.add("inactive");
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    trendingBtn.classList.add("inactive");
    movieDetailCategoriesList.classList.add("inactive");
    searchForm.classList.add("inactive");
    likedMoviesSection.classList.add("inactive");
  
    arrowBtn.addEventListener("click", () => location.hash = "#home");
  
    getTrendingMoviePreview();
    console.log("TRENDS!!");

    infiniteScroll = callback;
  }
  
  function categoriesPage() {
    console.log("CATEGORIES!!");
  
    headerSection.classList.remove("header-container--long");
    movieDetailCategoriesList.classList.add("inactive");
    headerSection.style.background = '';
    headerTitle.classList.add("inactive");
    searchForm.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    likedMoviesSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    headerCategoryTitle.classList.remove("inactive");
    trendingMoviesPreviewList.classList.remove("inactive");
    trendingPreviewSection.classList.add("inactive");
    arrowBtn.classList.remove("inactive");
    trendingBtn.classList.remove("inactive");
  
    const [_, dataInfo] = location.hash.split("=");
    const [idInfo, nameCategory] = dataInfo.split("-");
  
    headerCategoryTitle.innerHTML = nameCategory;
  
    getMoviesByCategory(idInfo);
    parameterId = idInfo;
    infiniteScroll = callback;
  }
  
  function searchMoviePage() {
    headerSection.classList.remove("header-container--long");
    movieDetailCategoriesList.classList.add("inactive");
    headerSection.style.background = '';
    headerTitle.classList.add("inactive");
    searchForm.classList.remove("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    headerCategoryTitle.classList.add("inactive");
    likedMoviesSection.classList.add("inactive");
    trendingMoviesPreviewList.classList.remove("inactive");
    trendingPreviewSection.classList.add("inactive");
    arrowBtn.classList.remove("inactive");
    trendingBtn.classList.add("inactive");
  
    const [_, query] = location.hash.split("=");
    getMoviesBySearch(query);

    parameter = query;
    infiniteScroll = callback;    
    
    console.log("search!!");
  }
  
  function detailsMoviePage() {
    console.log("MOVIE!!");
  
    headerSection.classList.add("header-container--long");
    // headerSection.style.background = '';
    headerTitle.classList.add("inactive");
    likedMoviesSection.classList.add("inactive");
    searchForm.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.add("inactive");
    headerCategoryTitle.classList.add("inactive");
    trendingMoviesPreviewList.classList.add("inactive");
    trendingPreviewSection.classList.add("inactive");
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.add("header-arrow--white");
    trendingBtn.classList.add("inactive");
  
  
    movieDetailCategoriesList.classList.remove("inactive");
    movieDetailSection.classList.remove("inactive");

    const [_, dataId] = location.hash.split("=");
    getTrendingMovieById(dataId);

  }

  function homePage() {
    console.log("HOME!!");
  
    trendingBtn.addEventListener("click", () => {
      location.hash = "#trends";
      getTrendingMovie();
    });
  
    location.hash = "#home";
    getTrendingMovie()
   
    getCategoriesMoviesPreview();
    getLikedMovies();
    // createLanguage();
  }