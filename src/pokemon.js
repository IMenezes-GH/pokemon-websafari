import Dialog, {
    DialogPokemon
} from "./dialog";


export default class Pokemon {
    
    static unknown = {
        name: 'Unknown',
        types: [{
            type: {
                name: '???'
            }
        }],
        abilities: [{
            ability: {name: '???'}
        }],
        sprites: {
            front_default: '../assets/unknown.png',
            versions: {
                "generation-v": {
                    'black-white': {
                        animated: {front_default: '../assets/unknown.png'},
                    }
                }
            }
        },
        stats: [{
            base_stat: '?'
        }, {
            base_stat: '?'
        }, {
            base_stat: '?'
        }, {
            base_stat: '?'
        }, {
            base_stat: '?'
        }, {
            base_stat: '?'
        }]
    }
    /**
     * 
     * @param {Object} apidata 
     */
    constructor(apidata = Pokemon.unknown) {

        this.data = apidata;

        this.seen = false;
        this.caught = false;
        this.dialog = new DialogPokemon(this.data);
    }

    setFilter() {
        if (this.seen && this.caught) return 'filter-brightness-1';
        if (this.seen && !this.caught) return 'filter-brightness-0';
        return 'filter-brightness-1';

    }

    createElement() {
        const article = document.createElement('article');
        article.classList.add('pokedex-slot')
        article.innerHTML =
            `
        <p>#${this.data.id}</p>
        <div class="img-wrapper">
        <img class="${this.setFilter()} pokedex-pokemon-img" src=${this.data.sprites.front_default} alt=${this.data.name}>
        </div>
        <h3>${this.seen ? this.data.name : '???'}</h3>
        <p>${this.data.types[0].type.name}${this.data.types[1] !== undefined ? '/' + this.data.types[1].type.name : ''}</p>
        `
        article.onclick = () => {
            const dialog = this.dialog.createElement();
            document.body.appendChild(dialog);
            dialog.showModal()
        };
        return article;

    }
}