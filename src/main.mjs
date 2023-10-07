const btn = document.getElementById("btn");



const clicks = 0
btn.value = clicks;
btn.innerText = `Clicks: ${btn.value}`;

btn.onclick = () => {
    btn.value = Number(btn.value) + 1;
    btn.innerText = `Clicks: ${btn.value}`;
}