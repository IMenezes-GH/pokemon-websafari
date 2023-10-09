import {EmptyStorageError, NoStorageError} from './error';

export default class Storage{


    constructor(profileName){
        return Storage.loadLocalStorage(profileName);
    }

    /**
     * Loads and parses localStorage data
     * @param {String} key A localStorage key to be read
     * @returns {Object}
     */
    static loadLocalStorage = (key) => {
    
        const storageData = JSON.parse(localStorage.getItem(key));
    
        if (storageData === null) throw new NoStorageError(key);
    
        return storageData;
    }
    
    static updateLocalStorage = (key, data) => {

        const storageData = JSON.stringify(data);
        localStorage.setItem(key, storageData);

    }

    /**
     * 
     * @param {String} key A localStorage key to be set
     * @param {Object} data A JSON object to be stored.
     * @returns {String} a stringfied localstorage item.
     */
    static createLocalStorage = (key, data) => {
    
        if (key === undefined || data === undefined) throw new Error(`Fields key and data are required.`);
    
        const newStorage = localStorage.setItem(String(key), JSON.stringify(data));
        return newStorage;
    }
    
    /**
     * Generates default JSON data for a given key
     * @param {String} key A localStorage key to be generated
     * @returns {Object}
     */
    static createStorageHelper = (key) => {
        switch (key) {
            case 'profiles':
                return {
                    'profiles': [],
                    'size' : 0
                }
            case 'profile':
                return {
                            name: null,
                            caught_pokemon: 0,
                            seen_pokemon: 0,
                            pokemon: [],
                            team: [],
                            unlocked_areas: ['safari']
                        };
            default:
                throw new Error('Invalid storage key');
    
        }
    }
}
