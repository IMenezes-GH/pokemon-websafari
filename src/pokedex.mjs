import Pokemon from "./pokemon.mjs";

const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon/';

const fetchPokemonData = async (pokemon) =>{
    const response = await fetch(`${POKEAPI_URL}${pokemon}`);
    if (!response.ok) throw new Error("Pokémon not found");

    return response.json();
}

const main = async() => {
    try {
        const data = await fetchPokemonData('porygon');
        const pokemon = new Pokemon(data);
        console.log(pokemon);
    }
    catch (err){
        console.error(err.message);
    }
}

main();