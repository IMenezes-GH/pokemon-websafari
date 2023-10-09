export default class Dialog {

    // Dialog types: confirm, warn

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
    }) {
        this.title = title;
        this.message = message;
        this.type = type;
        this.style = style;
        this.okmessage = okmessage;
        this.yesmessage = yesmessage;
        this.nomessage = nomessage;
        this.yesCallback = yesCallback;
        this.noCallback = noCallback;

        if (this.yesCallback === null){this.yesCallback = `"this.parentElement.parentElement.close()"`}
        if (this.noCallback === null){this.noCallback = `"this.parentElement.parentElement.close()"`}

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
                dialog.querySelector('.button-wrapper').innerHTML = `<button type="button" onclick="this.parentElement.parentElement.close()">${this.okmessage}</button>`
                break;
            case 'yesno':
                dialog.querySelector('.button-wrapper').innerHTML =
                    `
                <button onclick=${this.noCallback} class="cancel-button" type="button">${this.nomessage}</button>
                <button onclick=${this.yesCallback}>${this.yesmessage}</button>
                `
                break;

        }

        return dialog;
    }
}