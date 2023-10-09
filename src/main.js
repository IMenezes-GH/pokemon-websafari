import { getProfile } from "./util";

const playerText = document.getElementById('player');
playerText.innerText = getProfile() ? getProfile().name : '';
