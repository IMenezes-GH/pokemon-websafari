export default class Pokemon{

    /**
     * 
     * @param {Object} apidata 
     */
    constructor(apidata){

        this.id = apidata.id;
        this.name = apidata.name;
        this.types = apidata.types;
        this.sprite = apidata.sprites.front_default;
        this.image = apidata.sprites.other['official-artwork'].front_default;
    }

}