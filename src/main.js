import Storage from "./storage";
import { createNewProfileEvent, selectProfileEvent } from "./util";

const buttonPlay = document.getElementById('button-play');

buttonPlay.addEventListener('click', (ev) => {
    try {
        Storage.loadLocalStorage('profiles');

    } catch (err){
        Storage.createLocalStorage('profiles', Storage.createStorageHelper('profiles'));
    }
    finally{
        const profilesStorage = Storage.loadLocalStorage('profiles');
        let profile;
        if (profilesStorage.size === 1) profile = profilesStorage[1];
        if (profilesStorage.size > 1) selectProfileEvent();
        if (profile.name === null || profile.seenPokemon === 0) createNewProfileEvent();
    }
})