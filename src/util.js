const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon/';

export const fetchPokemonData = async (pokemon) =>{
    const response = await fetch(`${POKEAPI_URL}${pokemon}`);
    if (!response.ok) throw new Error("Pokémon not found");

    return response.json();
}
