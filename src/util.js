import { EmptyStorageError, NoStorageError } from "./error";
import Dialog from "./dialog";

const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon/';

export const fetchPokemonData = async (pokemon) =>{
    const response = await fetch(`${POKEAPI_URL}${pokemon}`);
    if (!response.ok) throw new Error("Pokémon not found");

    return response.json();
}

export const loadLocalStorage = (key) => {

    const storageData = JSON.parse(localStorage.getItem(key));

    if (storageData === null) throw new NoStorageError(key);
    if (storageData.size === undefined || storageData.size === 0) throw new EmptyStorageError();

    return storageData;
}

/**
 * 
 * @param {String} key A localStorage key to be set
 * @param {Object} data A JSON object to be stored.
 * @returns {String} a stringfied localstorage item.
 */
export const createLocalStorage = (key, data) => {

    if (key === undefined || data === undefined) throw new Error(`Fields key and data are required.`);

    const newStorage = localStorage.setItem(String(key), JSON.stringify(data));
    return newStorage;
}

export const selectProfileEvent = () => {

}


export const createNewProfileEvent = () => {

    
    const dialog = new Dialog({
        title: 'Create your trainer profile',
        message: 'No trainer profile data could be found. <br> Would you like to create a profile now? <br /><br > (No signing up needed, all data is stored locally in your browser!)',
        type:'yesno', yesmessage:'Yes, create a profile', nomessage:"No, don't create a profile", yesCallback: createTrainerEvent});

        document.body.appendChild(dialog);
        dialog.showModal();
        
        function createTrainerEvent(previousDialog){

            const goBack = (currentDialog) => {
                currentDialog.close();
                document.body.removeChild(currentDialog);
                previousDialog.showModal();
            }

            const createTrainerDialog = new Dialog({
                title: 'Choose your name',
                message: 'Choose a name for this profile',
                type: 'createProfile',
                noCallback: goBack
            });

            
            previousDialog.close();
            // document.body.removeChild(previousDialog);

            document.body.appendChild(createTrainerDialog);
            createTrainerDialog.showModal();
        }
}