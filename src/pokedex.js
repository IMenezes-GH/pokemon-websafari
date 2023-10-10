import Pokemon from "./pokemon.js";
import { fetchPokemonData, getProfile } from "./util.js";

const pokedex = document.getElementById('pokedex-container');
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous')

let searchIndex = 1;
const profile = getProfile();
const NUM_POKEMON = 12

// LISTENERS ================================
nextButton.onclick = () => {
    searchIndex += NUM_POKEMON;
    render(searchIndex);
}
previousButton.onclick = () => {
    if (searchIndex === 1) return;
    
    searchIndex -= NUM_POKEMON;
    render(searchIndex);
}

/**
 * Renders the pokédex page
 * @param {Number} index A Number from which the pokémon data renders from. searchIndex = 1 + NUM_POKEMONn
 */
async function render(index){
    previousButton.disabled = searchIndex === 1 || searchIndex === 40; //Disable button if it's the first page
    try {
        pokedex.replaceChildren();
        for (let i = index; i < index + NUM_POKEMON; i++){
            const data = await fetchPokemonData(i);
            const pokemon = new Pokemon(data);
            if (profile !== undefined && profile.pokemon.includes(pokemon.name)){
                pokemon.seen = true;
                pokemon.caught = true;
            }
            pokedex.appendChild(pokemon.createElement())
        }

    }
    catch (err){
        console.error(err.message);
    }

}

render(searchIndex);