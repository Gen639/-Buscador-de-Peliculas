const apiKey = "00368a5cf23e12b81e9b5bfd42a171f5";
const container = document.querySelector("#container");
const formSearch = document.getElementById("form");
const searchInput = document.getElementById("searchId");

// https://pokeapi.co/api/v2/pokemon/{id or name}/

function getRandom(a) {
  return Math.floor(Math.random() * a);
}

const showPokemon = async (pokemons, randomPokemonNumber) => {
  const response = await axios.get(pokemons[randomPokemonNumber].url);
  console.log(response);
  spriteUrl = response.data.sprites.other["official-artwork"].front_default;
  console.log(spriteUrl);
  const pokName = response.data.forms[0].name;
  console.log(pokName);
  container.innerHTML = `
    <h2 class = "d-block mt-5">${pokName}</h2>
    <div class="image-container mx-auto w-75">
      <img src="${spriteUrl}" class="img-fluid w-50">
    </div>
    `;
};

const findRandomPokemon = async (e) => {
  e.preventDefault();
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=1500.`);
  // console.log(res);
  const data = res.data;
  //   console.log(data);
  const numberAllPokemons = data.count;
  const pokemons = data.results;
  const randomPokemonNumber = getRandom(numberAllPokemons);
  showPokemon(pokemons, randomPokemonNumber);
};

formSearch.addEventListener("submit", findRandomPokemon);
