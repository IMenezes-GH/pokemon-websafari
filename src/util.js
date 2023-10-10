import Dialog from "./dialog";
import Storage from "./storage";

const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon/';

export const fetchPokemonData = async (pokemon) => {
    const response = await fetch(`${POKEAPI_URL}${pokemon}`);
    if (!response.ok) throw new Error("Pokémon not found");

    return response.json();
}


export const getProfile = () => {
    try {
        Storage.loadLocalStorage('profiles');
        const profilesStorage = Storage.loadLocalStorage('profiles');

        if (profilesStorage.size === 1) {
            return new Storage(profilesStorage.profile);
        }

        if (profilesStorage.size > 1) {
            return new Storage(profilesStorage.profile);
        }

    } catch (err) {
        Storage.createLocalStorage('profiles', Storage.createStorageHelper('profiles'));
        return null;
    }
}

export const selectProfileEvent = () => {
    const profilesStorage = Storage.loadLocalStorage('profiles');
    const changeProfile = (currentDialog) => {
        
        const getProfile = currentDialog.querySelector('select').value;
        profilesStorage.profile = getProfile;

        Storage.updateLocalStorage('profiles', profilesStorage);
        const playerText = document.getElementById('player');
        playerText.innerText = getProfile;

        currentDialog.close();
        document.body.removeChild(currentDialog);
        location.reload();
    }

    const dialog = new Dialog({
        title: 'Select a trainer profile',
        message: 'choose which trainer profile to use',
        type: 'selectProfile',
        yesCallback: changeProfile
    })


    document.body.appendChild(dialog);
    dialog.showModal();
}

export const createNewProfileEvent = () => {

    const dialog = new Dialog({
        title: 'Create another trainer profile?',
        message: 'Would you like to create another trainer profile?',
        type: 'yesno',
        yesmessage: 'Yes, create a profile',
        nomessage: "No, don't create a profile",
        yesCallback: createTrainerEvent
    });

    document.body.appendChild(dialog);
    dialog.showModal();
}


export const createFirstProfileEvent = () => {

    const dialog = new Dialog({
        title: 'Create your trainer profile',
        message: 'No trainer profile data could be found. <br> Would you like to create a profile now? <br /><br > (No signing up needed, all data is stored locally in your browser!)',
        type: 'yesno',
        yesmessage: 'Yes, create a profile',
        nomessage: "No, don't create a profile",
        yesCallback: createTrainerEvent
    });

    document.body.appendChild(dialog);
    dialog.showModal();

}


function createTrainerEvent(previousDialog) {

    const goBack = (currentDialog) => {
        currentDialog.close();

        document.body.removeChild(currentDialog);
        previousDialog.showModal();
    }

    const chooseName = async (currentDialog) => {
        const profilesData = Storage.loadLocalStorage('profiles');
        const trainerName = currentDialog.querySelector("input").value;
        const starterName = currentDialog.querySelector("select").value;

        const starterPokemon = await fetchPokemonData(starterName.toLowerCase());

        Storage.createLocalStorage(trainerName, Storage.createStorageHelper('profile'));

        const profileData = Storage.loadLocalStorage(trainerName);
        profileData.name = trainerName;
        profileData.pokemon.push(starterName);
        profileData.team.push(starterName);
        profileData.seen_pokemon = [starterPokemon.id];
        profileData.caught_pokemon = [starterPokemon.id];

        profilesData.profile = trainerName;
        profilesData.profiles.push(trainerName);
        profilesData.size += 1;

        Storage.updateLocalStorage(trainerName, profileData);
        Storage.updateLocalStorage('profiles', profilesData);

        currentDialog.close();
        document.body.removeChild(currentDialog);
        location.reload();
    }

    const createTrainerDialog = new Dialog({
        title: 'Choose your name',
        message: 'Choose your started and a name for this profile',
        type: 'createProfile',
        noCallback: goBack,
        yesCallback: chooseName
    });

    previousDialog.close();

    document.body.appendChild(createTrainerDialog);
    createTrainerDialog.showModal();
}