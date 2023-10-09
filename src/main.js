import Storage from "./storage";
import { getProfile, createNewProfileEvent, selectProfileEvent } from "./util";

const buttonPlay = document.getElementById('button-play');

buttonPlay.addEventListener('click', (ev) => {
    try {
        Storage.loadLocalStorage('profiles');
    } catch (err) {
        Storage.createLocalStorage('profiles', Storage.createStorageHelper('profiles'));
    } finally {

        const profilesStorage = Storage.loadLocalStorage('profiles');

        if (profilesStorage.size === 0) createNewProfileEvent();
        if (profilesStorage.size === 1) {
            const profile = getProfile();
            console.log(profile);
        }

        // if (profilesStorage.size > 1) selectProfileEvent();
    }
})