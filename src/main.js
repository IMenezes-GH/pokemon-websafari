import Player from "./player";
import { createFirstProfileEvent, getProfile, selectProfileEvent } from "./util";

const player = new Player();
const playerText = document.getElementById('player');

playerText.innerHTML = player.name;
playerText.addEventListener(('click'), () => {
    if (player.data.noProfile) createFirstProfileEvent();
    else selectProfileEvent();
})


console.log(player);