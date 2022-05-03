const pokemonListUrl = "https://pokeapi.co/api/v2/pokemon?limit=150";




const pokemonsContainer = document.querySelector('.pokemons');




const renderPokemons = function (data) {
    const pokemons = data.results;
    pokemons.forEach(function (pokemon) {
        const pokemonName = pokemon.name;

        const pokemonType = pokemon.types[0].type.name;
        const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonName}.png`;
        const pokemonCard = `
        <div class="pokemon">
            <div class="pokemon-image">
                <img src="${pokemonImage}" alt="${pokemonName}">
            </div>  
            <div class="pokemon-info">
                <h2>${pokemonName}</h2>
                <p>${pokemonType}</p>
            </div>  
        </div>  `;
        pokemonsContainer.innerHTML += pokemonCard;
    });
};







const renderError = function (msg) {
    pokemonsContainer.insertAdjacentText('beforeend', msg);

};

const pokedex = async function () {
    try {

        const response = await fetch(pokemonListUrl);
        console.log(response);

        // define our personalized error
        if (!response.ok) {
            throw new Error(`Error ${response.status}: Pokemon not found `);
        }
        const data = await response.json();
        renderPokemons(data);
    } catch (err) {
        console.error(`${err} ☠`);
        renderError(`Something went wrong ☠ ${err.message} ⛔ Try again!`);
    }
};


const getPokemonType = async function (type) {
    try {
        // AJAX call 1st country
        const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        console.log(response);

        // define our personalized error
        if (!response.ok) {
            throw new Error(`Error ${response.status}: Pokemon not found `);
        }
        const data = await response.json();
        renderPokemons(data);
    } catch (err) {
        console.error(`${err} ☠`);
        renderError(`Something went wrong ☠ ${err.message} ⛔ Try again!`);
    }


};


