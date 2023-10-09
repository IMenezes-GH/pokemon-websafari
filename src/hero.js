import Storage from "./storage";
import { getProfile, createFirstProfileEvent, selectProfileEvent, createNewProfileEvent } from "./util";

const buttonPlay = document.getElementById('button-play');

buttonPlay.addEventListener('click', (ev) => {
    try {
        Storage.loadLocalStorage('profiles');
    } catch (err) {
        Storage.createLocalStorage('profiles', Storage.createStorageHelper('profiles'));
    } finally {

        const profilesStorage = Storage.loadLocalStorage('profiles');

        if (profilesStorage.size === 0) createFirstProfileEvent();
        if (profilesStorage.size === 1) createNewProfileEvent();
        if (profilesStorage.size > 1) selectProfileEvent();

    }
})