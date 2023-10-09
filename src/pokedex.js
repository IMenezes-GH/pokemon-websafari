import Pokemon from "./pokemon.js";
import { fetchPokemonData } from "./util.js";

const pokedex = document.getElementById('pokedex-container');
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous')

let searchIndex = 1;

// LISTENERS ================================
nextButton.onclick = () => {
    searchIndex += 25;
    render(searchIndex);
}
previousButton.onclick = () => {
    if (searchIndex === 1) return;
    
    searchIndex -= 25;
    render(searchIndex);
}

/**
 * Renders the pokédex page
 * @param {Number} index A Number from which the pokémon data renders from. searchIndex = 1 + 25n
 */
async function render(index){
    previousButton.disabled = searchIndex === 1 || searchIndex === 40; //Disable button if it's the first page
    try {
        pokedex.replaceChildren();
        for (let i = index; i < index + 25; i++){
            const data = await fetchPokemonData(i);
            const pokemon = new Pokemon(data);
            pokedex.appendChild(pokemon.createElement())
        }

    }
    catch (err){
        console.error(err.message);
    }

}

render(searchIndex);