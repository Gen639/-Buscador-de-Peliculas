const apiKey = "00368a5cf23e12b81e9b5bfd42a171f5";
const moviesContainer = document.querySelector("#moviesContainer");
const formSearch = document.getElementById("form");
const searchInput = document.getElementById("searchId");

let genreListObj = {};

const getGenre = (genre_ids) => {
  const getGenresArray = genre_ids.map((genre_id) => {
    const genresContainedinTheObj = genreListObj.find(
      (item) => item.id === genre_id
    );
    if (genresContainedinTheObj) {
      return genresContainedinTheObj.name;
    }
  });
  return getGenresArray.join(", ");
};

const showMovies = (movies) => {
  moviesContainer.innerHTML = "";

  movies.forEach(({ poster_path, original_title, overview, genre_ids }) => {
    const limitedOverview =
      overview.length > 100 ? overview.slice(0, 100) + "..." : overview;

    moviesContainer.innerHTML += `
    <div class="card col-lg-3 col-xs-12 col-md-6">
      <img src="https://image.tmdb.org/t/p/original${poster_path}" alt="${original_title}">
              <div class="card-body">
              <h3 class="card-header">${original_title}</h3>
              <h5 class="card-title">${limitedOverview}</h5>
              <p class="card-text">${getGenre(genre_ids)}</p>
              
          </div>
      </div>
    `;
  });
};

const searchMovies = async (e) => {
  e.preventDefault();
  try {
    const search = searchInput.value;
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${apiKey}`
    );

    const movies = res.data.results;
    showMovies(movies);
  } catch (error) {
    console.error(error);
  }
};

const allGenreObj = async () => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${apiKey}`
    );
    genreListObj = res.data.genres;
    console.log(genreListObj);
  } catch (error) {
    console.error(error);
  }
};
allGenreObj();
formSearch.addEventListener("submit", searchMovies);
