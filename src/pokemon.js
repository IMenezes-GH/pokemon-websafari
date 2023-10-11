import unknownUrl from '../assets/unknown.png';

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
            front_default: unknownUrl,
            versions: {
                "generation-v": {
                    'black-white': {
                        animated: {front_default: unknownUrl},
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
    constructor(apidata = Pokemon.unknown, seen = false, caught = false) {

        this.data = apidata;

        this.seen = seen;
        this.caught = caught;
        this.dialog = this.createDialog();
    }

    setFilter() {
        console.log(this.seen, this.caught);
        if (this.seen && this.caught) return 'filter-brightness-1';
        if (this.seen && !this.caught) return 'filter-brightness-0';
        if (!this.seen && !this.caught) return 'filter-brightness-1';

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
            const dialog = this.dialog;
            document.body.appendChild(dialog);
            dialog.showModal()
        };
        return article;

    }

    createDialog(){
        const dialog = document.createElement('dialog');
        const [type1, type2] = [...this.data.types];
        const [hp, atk, def, spa, spd, spe] = [...this.data.stats];
        const [ab1, ab2, ha] = [...this.data.abilities];

        dialog.classList.add('pokemon-dialog')
        dialog.innerHTML =
        `
        <article>
        <header>
        <h1>${this.data.name}</h1>
        <button class="close-button">close</button>
        </header>
        <section>
            <div>
            <h2>${type1.type.name}${type2 ? '/' + type2.type.name : ''}</h2>
            <h3 class="txt-weight-200">${ab1.ability.name}${ab2 ? '/' + ab2.ability.name : ''}</h3>
            <ul>
                <li>HP: ${this.caught ? hp.base_stat : '???'}</li>
                <li>ATK: ${this.caught ? atk.base_stat : '???'}</li>
                <li>DEF: ${this.caught ? def.base_stat : '???'}</li>
                <li>SPA: ${this.caught ? spa.base_stat : '???'}</li>
                <li>SPD: ${this.caught ? spd.base_stat : '???'}</li>
                <li>SPE: ${this.caught ? spe.base_stat : '???'}</li>
            </ul>
            </div>
            <div>
            <img class="${this.setFilter()}" src=${this.data.sprites.versions['generation-v']['black-white'].animated.front_default || this.data.sprites.front_default}>
            </div>        
        </section>
        <p>${this.caught ? 'Caught' : 'Not caught yet'}</p>
        <section>
        </section>
        </article>
        `
        dialog.querySelector('.close-button').addEventListener('click', () => dialog.close())

        return dialog;
    }
}