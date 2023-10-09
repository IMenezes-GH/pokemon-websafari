import { createNewProfileEvent, selectProfileEvent, loadLocalStorage } from "./util";


const buttonPlay = document.getElementById('button-play');

buttonPlay.addEventListener('click', (ev) => {
    const profilesStorage = loadLocalStorage('profiles');
    let profile;
    
    if (profilesStorage.size === 1) profile = profilesStorage[1];
    if (profilesStorage.size > 1) selectProfileEvent();
    if (profile.name === null || profile.seenPokemon === 0) createNewProfileEvent();
})