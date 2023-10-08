export default class Pokemon{

    /**
     * 
     * @param {Object} apidata 
     */
    constructor(apidata){

        this.id = apidata.id;
        this.name = apidata.name.charAt(0).toUpperCase() + apidata.name.substring(1);
        this.types = apidata.types;
        this.sprite = apidata.sprites.front_default;
        this.image = apidata.sprites.other['official-artwork'].front_default;
    }

    createElement(){
        const article = document.createElement('article');
        article.classList.add('pokedex-slot')
        article.innerHTML =
        `
        <p>#${this.id}</p>
        <div class="img-wrapper">
        <img src=${this.sprite} alt=${this.name}>
        </div>
        <h3>???</h3>
        <p>${this.types[0].type.name}${this.types[1] !== undefined ? '/' + this.types[1].type.name : ''}</p>
        `
        return article;

    }
}