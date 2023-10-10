import Player from "./player";
import { createFirstProfileEvent, getProfile, selectProfileEvent } from "./util";

export const player = new Player();
const playerText = document.getElementById('player');
const menuButton = document.getElementById('menu-button');
const asideMenu = document.getElementById('aside-menu');

if (window.innerWidth >= 612){
    playerText.innerHTML = player.name;
    playerText.addEventListener(('click'), () => {
        if (player.data.noProfile) createFirstProfileEvent();
        else selectProfileEvent();
    })
}


menuButton.addEventListener('click', (ev) => {
    asideMenu.classList.toggle('toggle-hidden');
    asideMenu.onmouseleave = (ev) => {
        asideMenu.classList.add('toggle-hidden')
    }
    window.onscroll = () => {
        asideMenu.classList.add('toggle-hidden');
    }
})

