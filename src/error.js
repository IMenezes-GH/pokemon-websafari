import { createLocalStorage } from "./util";

export class EmptyStorageError extends Error {

    constructor() {
        super();
        this.message = 'localStorage is Empty';
    }

}

export class NoStorageError extends Error {

    constructor(key) {
        super();
        this.key = key;
        this.message = `No localStorage found for ${key}`;
        
        createLocalStorage(this.key, this.createStorageHelper());
    }

    createStorageHelper() {
        switch (this.key) {
            case 'profiles':
                return {
                    size: 1,
                        1: {
                            name: null,
                            caught_pokemon: 0,
                            seen_pokemon: 0,
                            pokemon: [],
                            team: [],
                            unlocked_areas: ['safari']
                        }
                    };
            default:
                throw new Error('Invalid storage key');

        }
    }
}