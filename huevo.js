let tiempo = 20;

let huevosEncontrados = 0;

let huevosNecesarios = 5;

let juegoTerminado = false;

let monedasGanadas = 0;

let reloj;

let movimientoHuevo;


// ==========================================
// ELEMENTOS DEL HTML
// ==========================================

const huevo =
    document.getElementById("huevo");

const zonaJuego =
    document.getElementById("zona-juego");

const tiempoTexto =
    document.getElementById("tiempo");

const huevosTexto =
    document.getElementById("huevos");

const premioTexto =
    document.getElementById("premio");

const mensaje =
    document.getElementById("mensaje");

const nuevoJuego =
    document.getElementById("nuevo-juego");

const obstaculos =
    document.querySelectorAll(".obstaculo");


// ==========================================
// MOVER EL HUEVO
// ==========================================

function moverHuevo() {

    const ancho =
        zonaJuego.clientWidth;

    const alto =
        zonaJuego.clientHeight;


    const anchoHuevo =
        huevo.offsetWidth;

    const altoHuevo =
        huevo.offsetHeight;


    let nuevaX;

    let nuevaY;

    let posicionValida = false;


    /*
    Intentamos encontrar una posición
    que no esté encima de un obstáculo.
    */

    let intentos = 0;


    while (
        !posicionValida &&
        intentos < 100
    ) {

        nuevaX =
            Math.floor(
                Math.random() *
                (ancho - anchoHuevo)
            );


        nuevaY =
            Math.floor(
                Math.random() *
                (alto - altoHuevo)
            );


        posicionValida =
            comprobarPosicion(
                nuevaX,
                nuevaY
            );


        intentos++;
    }


    /*
    Colocar huevo.
    */

    huevo.style.left =
        nuevaX + "px";

    huevo.style.top =
        nuevaY + "px";
}


// ==========================================
// COMPROBAR OBSTÁCULOS
// ==========================================

function comprobarPosicion(x, y) {

    const tamaño =
        huevo.offsetWidth;


    const huevoIzquierda =
        x;

    const huevoDerecha =
        x + tamaño;

    const huevoArriba =
        y;

    const huevoAbajo =
        y + tamaño;


    /*
    Revisar cada obstáculo.
    */

    for (
        let obstaculo of obstaculos
    ) {

        const obstaculoIzquierda =
            obstaculo.offsetLeft;

        const obstaculoDerecha =
            obstaculoIzquierda +
            obstaculo.offsetWidth;

        const obstaculoArriba =
            obstaculo.offsetTop;

        const obstaculoAbajo =
            obstaculoArriba +
            obstaculo.offsetHeight;


        /*
        Detectar choque.
        */

        const choque =

            huevoIzquierda <
            obstaculoDerecha &&

            huevoDerecha >
            obstaculoIzquierda &&

            huevoArriba <
            obstaculoAbajo &&

            huevoAbajo >
            obstaculoArriba;


        if (choque) {

            return false;
        }
    }


    return true;
}


// ==========================================
// ENCONTRAR HUEVO
// ==========================================

function encontrarHuevo() {

    if (juegoTerminado) {

        return;
    }


    /*
    Sumar huevo.
    */

    huevosEncontrados++;


    huevosTexto.textContent =
        huevosEncontrados;


    /*
    Sumar monedas.
    */

    monedasGanadas += 5;


    premioTexto.textContent =
        monedasGanadas;


    /*
    ¿GANÓ?
    */

    if (
        huevosEncontrados >=
        huevosNecesarios
    ) {

        ganarJuego();

        return;
    }


    /*
    Mensaje.
    */

    mensaje.textContent =

        "🥚 ¡Encontraste uno! " +

        huevosEncontrados +

        "/" +

        huevosNecesarios +

        " — ¡Busca el siguiente! 👀";


    /*
    El huevo cambia de lugar.
    */

    moverHuevo();


    /*
    Lo hacemos un poquito más pequeño.
    */

    hacerMasDificil();
}


// ==========================================
// HACER MÁS DIFÍCIL
// ==========================================

function hacerMasDificil() {

    /*
    Reducimos el tamaño.
    */

    let tamaño =
        70 -
        (huevosEncontrados * 6);


    /*
    No dejar que sea demasiado pequeño.
    */

    if (tamaño < 40) {

        tamaño = 40;
    }


    huevo.style.width =
        tamaño + "px";

    huevo.style.height =
        tamaño + "px";


    const imagen =
        huevo.querySelector("img");


    if (imagen) {

        imagen.style.width =
            (tamaño - 15) + "px";

        imagen.style.height =
            (tamaño - 15) + "px";
    }
}


// ==========================================
// EL HUEVO SE MUEVE SOLO
// ==========================================

function comenzarMovimiento() {

    /*
    Cada 1.2 segundos cambia
    de posición.
    */

    movimientoHuevo =
        setInterval(

            function() {

                if (
                    !juegoTerminado
                ) {

                    moverHuevo();
                }

            },

            1200
        );
}


// ==========================================
// TEMPORIZADOR
// ==========================================

function comenzarTiempo() {

    reloj = setInterval(

        function() {

            tiempo--;

            tiempoTexto.textContent =
                tiempo;


            /*
            Se acabó el tiempo.
            */

            if (tiempo <= 0) {

                perderJuego();
            }

        },

        1000
    );
}


// ==========================================
// GANAR
// ==========================================

function ganarJuego() {

    juegoTerminado = true;


    clearInterval(reloj);

    clearInterval(movimientoHuevo);


    huevo.style.display =
        "none";


    /*
    Premio final.
    */

    monedasGanadas = 25;


    premioTexto.textContent =
        monedasGanadas;


    mensaje.textContent =

        "🎉 ¡GANASTE! Encontraste " +

        huevosNecesarios +

        " huevos. +25 🪙 +20 XP";


    guardarRecompensa();
}


// ==========================================
// PERDER
// ==========================================

function perderJuego() {

    juegoTerminado = true;


    clearInterval(reloj);

    clearInterval(movimientoHuevo);


    huevo.style.display =
        "none";


    mensaje.textContent =

        "⏰ ¡Se acabó el tiempo! " +

        "Encontraste " +

        huevosEncontrados +

        "/" +

        huevosNecesarios +

        " huevos. 😭";
}


// ==========================================
// GUARDAR RECOMPENSA
// ==========================================

function guardarRecompensa() {

    const partidaGuardada =

        localStorage.getItem(
            "partidaDinosauria"
        );


    let partida;


    if (partidaGuardada) {

        partida =
            JSON.parse(
                partidaGuardada
            );

    } else {

        partida = {

            coins: 100,

            xp: 0,

            level: 1,

            hunger: 80,

            happiness: 70

        };
    }


    /*
    Monedas.
    */

    partida.coins += 25;


    /*
    XP.
    */

    partida.xp += 20;


    /*
    Guardar.
    */

    localStorage.setItem(

        "partidaDinosauria",

        JSON.stringify(partida)
    );
}


// ==========================================
// NUEVO JUEGO
// ==========================================

function iniciarJuego() {

    /*
    Detener juegos anteriores.
    */

    clearInterval(reloj);

    clearInterval(movimientoHuevo);


  

    tiempo = 20;

    huevosEncontrados = 0;

    monedasGanadas = 0;

    juegoTerminado = false;



    tiempoTexto.textContent =
        tiempo;

    huevosTexto.textContent =
        "0";

    premioTexto.textContent =
        "0";


    mensaje.textContent =
        " ¡Encuentra los 5 huevos!";

    huevo.style.display =
        "flex";
    huevo.style.width =
        "70px";

    huevo.style.height =
        "70px";


    const imagen =
        huevo.querySelector("img");


    if (imagen) {

        imagen.style.width =
            "55px";

        imagen.style.height =
            "55px";
    }

    moverHuevo();

    comenzarMovimiento();


   comenzarTiempo();
}

huevo.addEventListener(
    "click",
    encontrarHuevo
);
nuevoJuego.addEventListener(
    "click",
    iniciarJuego);

iniciarJuego()