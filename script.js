let coins = 10000;
let xp = 0;
let level = 1;
let hunger = 80;
let happiness = 70;

const coinsText = document.getElementById("coins");
const xpText = document.getElementById("xp");
const levelText = document.getElementById("level");

const hungerText = document.getElementById("hunger");
const happinessText = document.getElementById("happiness");

const hungerBar = document.getElementById("hunger-bar");
const happinessBar = document.getElementById("happiness-bar");

const message = document.getElementById("message");
function actualizarPantalla() {

    coinsText.textContent = coins;

    xpText.textContent = xp;

    levelText.textContent = level;

    hungerText.textContent = hunger;

    happinessText.textContent = happiness;

    hungerBar.style.width = hunger + "%";

    happinessBar.style.width = happiness + "%";
}

function alimentar() {

    if (coins < 1) {

        message.textContent =
            "No tienes suficientes monedas. ";

        return;
    }
    coins -= 10;
    hunger += 20;


    if (hunger > 100) {
        hunger = 100;
    }


    ganarXP(10);


    message.textContent =
        "¡Raptín está comiendo felizmente! ";


    actualizarPantalla();

    guardarPartida();
}

function jugar() {

    if (hunger < 20) {

        message.textContent =
            "Raptín tiene demasiada hambre. Primero dale comida. 🍖";

        return;
    }


    happiness += 15;
    coins +=8;


    if (happiness > 100) {
        happiness = 100;
    }


    ganarXP(15);


    message.textContent =
        "¡Raptín se divirtió muchísimo!";


    actualizarPantalla();

    guardarPartida();
}

function ganarXP(cantidad) {

    xp += cantidad;


    if (xp >= 100) {

        xp -= 100;

        level++;


        message.textContent =
            " ¡Subiste al nivel " + level + "!";
    }
}

function guardarPartida() {

    const partida = {

        coins: coins,

        xp: xp,

        level: level,

        hunger: hunger,

        happiness: happiness

    };


    localStorage.setItem(
        "partidaDinosauria",
        JSON.stringify(partida)
    );
}

function cargarPartida() {

    const partidaGuardada =
        localStorage.getItem("partidaDinosauria");


    if (partidaGuardada) {

        const partida =
            JSON.parse(partidaGuardada);


        coins = partida.coins;

        xp = partida.xp;

        level = partida.level;

        hunger = partida.hunger;

        happiness = partida.happiness;
    }


    actualizarPantalla();
}

document
    .getElementById("feed-btn")
    .addEventListener("click", alimentar);


document
    .getElementById("play-btn")
    .addEventListener("click", jugar);




document
    .getElementById("coins-btn")
    .addEventListener("click", conseguirMonedas);


function conseguirMonedas() {

    coins += 100;

    message.textContent =
        "¡Conseguiste 100 monedas!";

    actualizarPantalla();

    guardarPartida();
}
cargarPartida();