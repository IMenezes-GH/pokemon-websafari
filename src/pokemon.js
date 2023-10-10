import Dialog, {
    DialogPokemon
} from "./dialog";

export default class Pokemon {

    /**
     * 
     * @param {Object} apidata 
     */
    constructor(apidata) {

        this.data = apidata;
        this.id = apidata.id;
        this.name = apidata.name.charAt(0).toUpperCase() + apidata.name.substring(1);
        this.types = apidata.types;
        this.sprite = apidata.sprites.front_default;
        this.image = apidata.sprites.other['official-artwork'].front_default;
        this.seen = false;
        this.caught = false;
        this.dialog = new DialogPokemon(this.data);
    }

    createElement() {
        const article = document.createElement('article');
        article.classList.add('pokedex-slot')
        article.innerHTML =
            `
        <p>#${this.id}</p>
        <div class="img-wrapper">
        <img ${this.caught ? 'class="show"' : ''} src=${this.sprite} alt=${this.name}>
        </div>
        <h3>${this.seen ? this.name : '???'}</h3>
        <p>${this.types[0].type.name}${this.types[1] !== undefined ? '/' + this.types[1].type.name : ''}</p>
        `
        article.onclick = () => {
            const dialog = this.dialog.createElement();
            document.body.appendChild(dialog);
            dialog.showModal()
        };
        return article;

    }
}