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
    }
    
}