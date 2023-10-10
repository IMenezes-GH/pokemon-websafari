import { player } from "./main.js";
import Pokemon from "./pokemon.js";
import { fetchPokemonData, getProfile } from "./util.js";

const pokedex = document.getElementById('pokedex-container');
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous')

const searchInput = document.getElementById('pokedex-pager');
const searchButton = document.getElementById('search-button');

let searchIndex = 1;
const profile = getProfile();
const NUM_POKEMON = 12

const page = sessionStorage.getItem('page');
searchIndex = Number(page) || 1;

// LISTENERS ================================
nextButton.onclick = () => {
    searchIndex += NUM_POKEMON;
    sessionStorage.setItem('page', searchIndex);
    render(searchIndex);
}

previousButton.onclick = () => {
    if (searchIndex === 1) return;
    
    searchIndex -= NUM_POKEMON;
    sessionStorage.setItem('page', searchIndex);
    render(searchIndex);
}

searchButton.onclick = () => {

    async function nameSearch(name){
        const pokemonId = await fetchPokemonData(name);
        if (pokemonId) {
            searchIndex = pokemonId.id;
            sessionStorage.setItem('page', searchIndex);
            render(searchIndex);
            location.reload();
        }
    };
    function numberSearch(num){
        searchIndex = num;
        sessionStorage.setItem('page', searchIndex);
        render(searchIndex);
        location.reload();
    }

    const value = searchInput.value;
    if (isNaN(value)) nameSearch(value);
    if (Number(value)) numberSearch(value);
}

/**
 * Renders the pokédex page
 * @param {Number} index A Number from which the pokémon data renders from. searchIndex = 1 + NUM_POKEMONn
 */
async function render(index){
    previousButton.disabled = searchIndex - NUM_POKEMON <= 0; //Disable button if it's the first page
    try {
        pokedex.replaceChildren();
        for (let i = index; i < index + NUM_POKEMON; i++){

            if (profile.seen_pokemon.includes(i)){
                const pokemon = new Pokemon(await fetchPokemonData(i));
                pokemon.seen = true;
                pokemon.caught = profile.caught_pokemon.includes(i);

                pokedex.appendChild(pokemon.createElement())
            } else {
                const unknownPokemon = new Pokemon();
                unknownPokemon.data.id = i;
                pokedex.appendChild(unknownPokemon.createElement())
            }
        }
    }
    catch (err){
        console.error(err.message);
    }

}

render(searchIndex);