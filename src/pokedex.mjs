import Pokemon from "./pokemon.mjs";
import { fetchPokemonData } from "./util.mjs";

const pokedex = document.getElementById('pokedex-container');
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous')

let searchIndex = 1;

nextButton.onclick = () => {
    searchIndex += 24;
    render(searchIndex);
}
previousButton.onclick = () => {
    searchIndex -= 24;
    render(searchIndex);
}

async function render(index){
    try {
        pokedex.replaceChildren();
        for (let i = index; i < index + 24; i++){
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