import { getProfile } from "./util";
import Storage from "./storage";

export default class Player {

    
    constructor() {
        this.data = getProfile() || {name: 'Create your profile', noProfile: true};
    }

    set name(newName){
        
        this.oldname = this.data.name;
        this.data.name = newName;
        Storage.createLocalStorage(newName, this.data);
    }
    get name(){
        return this.data.name;
    }

    givePokemon(pokeId){

        this.data.pokemon.push(pokeId);
        this.data.seen_pokemon.push(pokeId);
        this.data.caught_pokemon.push(pokeId);

        Storage.updateLocalStorage(this.data.name, this.data);
    }

}