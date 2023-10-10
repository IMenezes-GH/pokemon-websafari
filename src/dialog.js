import Storage from "./storage";

export default class Dialog {

    // Dialog types: confirm, warn, CreateProfile

    static defaultCallback = (dialogElement) => {
        dialogElement.close();
        document.body.removeChild(dialogElement);
    }

    /**
     * Creates a HTMLDialog Element
     * @param {Object} 
     * @param {String} title A title for the Dialog
     * @param {String} Message The message displayed
     * @param {String?} Type The type of Dialog to be rendered (e.g: Warn, Confirm)
     * @param {String?} Style the CSS class to be applied to the Dialog
     * @param {String?} yesmessage The text to be displayed on "confirm" buttons
     * @param {String?} nomessage The text to be displayed on "cancel" buttons
     * @param {CallableFunction?} yesCallback The Callback for "confirm" events
     * @param {CallableFunction?} noCallback The Callback for "cancel" events
     * @returns 
     */
    constructor({
        title,
        message,
        type = 'warn',
        style = 'white',
        okmessage = 'Ok',
        yesmessage = 'Yes',
        nomessage = 'No',
        yesCallback = null,
        noCallback = null
        }) 
        {
        this.title = title;
        this.message = message;
        this.type = type;
        this.style = style;
        this.okmessage = okmessage;
        this.yesmessage = yesmessage;
        this.nomessage = nomessage;
        this.yesCallback = yesCallback;
        this.noCallback = noCallback;
        this.value = 'no';

        if (this.yesCallback === null) {this.yesCallback = Dialog.defaultCallback}
        if (this.noCallback === null) {this.noCallback = Dialog.defaultCallback}
        
        return this.createElement();
    }

    createElement() {
        const dialog = document.createElement('dialog');
        dialog.innerHTML =
            `
        <h2>${this.title}</h2>
        <hr>
        <p>${this.message}</p>
        <div class="button-wrapper"></div>
        `
        dialog.classList.add(this.style)

        switch (this.type) {
            case 'warn':
                dialog.querySelector('.button-wrapper').innerHTML = `<button value="no" type="button" onclick="this.parentElement.parentElement.close()">${this.okmessage}</button>`
                dialog.querySelector('button').addEventListener('click', () => this.noCallback(dialog))
                break;
            case 'yesno':
                dialog.querySelector('.button-wrapper').innerHTML =
                    `
                <button value="no" class="cancel-button" type="button">${this.nomessage}</button>
                <button value="yes">${this.yesmessage}</button>
                `
                dialog.querySelector('button:nth-of-type(1)').addEventListener('click', () => this.noCallback(dialog, ...arguments))
                dialog.querySelector('button:nth-of-type(2)').addEventListener('click', () => this.yesCallback(dialog, ...arguments))
                break;
            case 'selectProfile':
                const profilesStorage = Storage.loadLocalStorage('profiles');
                const profiles = profilesStorage.profiles

                dialog.innerHTML =
                `
                <h2>${this.title}</h2>
                <hr>
                <p>${this.message}</p>
                <select>
                </select>
                <div class="button-wrapper">
                <button value="no" class="cancel-button" type="button">${this.nomessage}</button>
                <button value="yes">${this.yesmessage}</button>
                </div>
                `
                for (let i = 0; i < profilesStorage.size; i++){
                    const option = document.createElement('option')
                    option.value = profiles[i];
                    option.innerText = profiles[i]
                    dialog.querySelector('select').appendChild(option)
                }
                dialog.querySelector('button:nth-of-type(1)').addEventListener('click', () => this.noCallback(dialog, ...arguments))
                dialog.querySelector('button:nth-of-type(2)').addEventListener('click', () => this.yesCallback(dialog, ...arguments))

                break;
            case 'createProfile':
                dialog.innerHTML =
                `
                <h2>${this.title}</h2>
                <hr>
                <p>${this.message}</p>
                <select>
                <option value="Bulbasaur">Bulbasaur</option>
                <option value="Charmander">Charmander</option>
                <option value="Squirtle">Squirtle</option>
                </select>
                <div class="button-wrapper">
                <input required class="flex-grow-1" type="text" placeholder="Your trainer name"/>
                <button class="cancel-button">Go Back</button>
                <button>Create Trainer</button>
                </div>
                `
                dialog.querySelector('button:nth-of-type(1)').addEventListener('click', () => this.noCallback(dialog, ...arguments))
                dialog.querySelector('button:nth-of-type(2)').addEventListener('click', () => this.yesCallback(dialog, ...arguments))

                break;
                
        }

        return dialog;
    }
}

export class DialogPokemon{
    
    constructor(data){
        this.pokemon = data;
    }

    createElement(){
        const dialog = document.createElement('dialog');
        const [type1, type2] = [...this.pokemon.types];
        const [hp, atk, def, spa, spd, spe] = [...this.pokemon.stats];
        const [ab1, ab2, ha] = [...this.pokemon.abilities];

        dialog.classList.add('pokemon-dialog')
        dialog.innerHTML =
        `
        <article>
        <header>
        <h1>${this.pokemon.name}</h1>
        <button class="close-button">close</button>
        </header>
        <section>
            <div>
            <h2>${type1.type.name}${type2 ? '/' + type2.type.name : ''}</h2>
            <h3 class="txt-weight-200">${ab1.ability.name}${ab2 ? '/' + ab2.ability.name : ''}</h3>
            <ul>
                <li>HP: ${hp.base_stat}</li>
                <li>ATK: ${atk.base_stat}</li>
                <li>DEF: ${def.base_stat}</li>
                <li>SPA: ${spa.base_stat}</li>
                <li>SPD: ${spd.base_stat}</li>
                <li>SPE: ${spe.base_stat}</li>
            </ul>
            </div>
            <div>
            <img src=${this.pokemon.sprites.versions['generation-v']['black-white'].animated.front_default || this.pokemon.sprites.front_default}>
            </div>        
        </section>
        <section>
        </section>
        </article>
        `
        dialog.querySelector('.close-button').addEventListener('click', () => dialog.close())

        return dialog;
    }
}
